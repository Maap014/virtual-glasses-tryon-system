"use client";
import { ProductType } from "@/types";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

interface VirtualTryOnProps {
  onCameraError: (message: string) => void;
  onVtoError: (message: string) => void;
  selectedProduct: ProductType;
}

const VirtualTryon = ({
  onCameraError,
  onVtoError,
  selectedProduct,
}: VirtualTryOnProps) => {
  const webcamRef = useRef<Webcam | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);

  const [isMediaPipeReady, setIsMediaPipeReady] = useState(false);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [faceDetected, setFaceDetected] = useState<boolean | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glassesImageRef = useRef<HTMLImageElement | null>(null);

  const isVtoReady = isMediaPipeReady && isWebcamReady;

  useEffect(() => {
    const glassesImage = new Image();

    glassesImage.src = selectedProduct.tryon_url;

    glassesImage.onload = () => {
      glassesImageRef.current = glassesImage;

      console.log("Glasses image loaded successfully");
    };

    glassesImage.onerror = () => {
      console.error("Failed to load glasses image");
      onVtoError(
        "The selected glasses could not be loaded. Please try another product.",
      );
    };
  }, [selectedProduct.tryon_url, onVtoError]);

  useEffect(() => {
    const createFaceLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
      });

      faceLandmarkerRef.current = faceLandmarker;
      setIsMediaPipeReady(true);

      console.log("MediaPipe Face Landmarker is ready.");
    };

    createFaceLandmarker().catch((error) => {
      console.error("Failed to load MediaPipe:", error);
      onVtoError("Virtual try-on failed to load. Please try again.");
    });

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      faceLandmarkerRef.current?.close();
    };
  }, []);

  const predictWebcam = () => {
    const video = webcamRef.current?.video;
    const faceLandmarker = faceLandmarkerRef.current;

    const canvas = canvasRef.current;

    if (!video || !faceLandmarker || !canvas) {
      animationFrameRef.current = requestAnimationFrame(predictWebcam);

      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(predictWebcam);

      return;
    }

    // Make the canvas match the displayed webcam size
    if (
      canvas.width !== video.videoWidth ||
      canvas.height !== video.videoHeight
    ) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const glassesImage = glassesImageRef.current;

    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (lastVideoTimeRef.current !== video.currentTime) {
      lastVideoTimeRef.current = video.currentTime;

      const results = faceLandmarker.detectForVideo(video, performance.now());

      //   console.log("Face Landmarker results:", results);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.faceLandmarks.length > 0) {
        setFaceDetected(true);
        const landmarks = results.faceLandmarks[0];

        if (glassesImage) {
          const leftEye = landmarks[33];
          const rightEye = landmarks[263];

          // Convert MediaPipe coordinates into canvas pixels.
          // Reverses the x coordinates because the webcam is mirrored.
          const leftX = (1 - leftEye.x) * canvas.width;
          const leftY = leftEye.y * canvas.height;

          const rightX = (1 - rightEye.x) * canvas.width;
          const rightY = rightEye.y * canvas.height;

          // Find the point halfway between both eye landmarks.
          const centreX = (leftX + rightX) / 2;
          const centreY = (leftY + rightY) / 2;

          // Measure the straight-line distance between both eye landmarks.
          const eyeDistance = Math.hypot(rightX - leftX, rightY - leftY);

          // Controls how wide the glasses appear.
          const widthScale = 2;

          const glassesWidth = eyeDistance * widthScale;

          // Preserve the PNG's original width-to-height proportions.
          const glassesHeight =
            glassesWidth *
            (glassesImage.naturalHeight / glassesImage.naturalWidth);

          // Fine-tuning values.
          const horizontalOffset = glassesWidth * 0.0;
          const verticalOffset = glassesHeight * 0.02;

          // Calculate the tilt between the two eye landmarks.
          const angle = Math.atan2(leftY - rightY, leftX - rightX);

          // Save the normal canvas state.
          ctx.save();

          // Move the canvas origin to the adjusted glasses centre.
          ctx.translate(centreX + horizontalOffset, centreY + verticalOffset);

          // Rotate around the glasses centre.
          ctx.rotate(angle);

          // Draw the glasses around the new centre point.
          ctx.drawImage(
            glassesImage,
            -glassesWidth / 2,
            -glassesHeight / 2,
            glassesWidth,
            glassesHeight,
          );

          // Return the canvas to its normal state.
          ctx.restore();
        }
        landmarks.forEach((landmark) => {
          const x = (1 - landmark.x) * canvas.width;
          const y = landmark.y * canvas.height;

          // this used as a reference to draw the glasses on the face, but not visible to the user
          //  Start drawing a new dot
          ctx.beginPath();

          // Draw a small circle at this landmark position
          ctx.arc(x, y, 1, 0, Math.PI * 2);

          // Fill the circle so it becomes visible
          ctx.fillStyle = "transparent";
          ctx.fill();
        });
      } else {
        // console.log("No face detected.");
        setFaceDetected(false);
      }
    }

    animationFrameRef.current = requestAnimationFrame(predictWebcam);
  };
  useEffect(() => {
    if (isWebcamReady && isMediaPipeReady) {
      predictWebcam();
    }
  }, [isWebcamReady, isMediaPipeReady]);

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-border">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored
        videoConstraints={{ facingMode: "user" }}
        onUserMedia={() => {
          setIsWebcamReady(true);
        }}
        onUserMediaError={() => {
          onCameraError(
            "Camera access was blocked. Please allow camera permission in your browser and refresh the page.",
          );
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {!isVtoReady && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-primary" />

          <p className="mt-4 text-sm font-medium">
            {!isWebcamReady
              ? "Starting camera..."
              : "Loading virtual try-on..."}
          </p>
        </div>
      )}
      {isVtoReady && faceDetected === false && (
        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/70 px-5 py-2 text-sm text-white">
          No face detected. Please face the camera.
        </div>
      )}
    </div>
  );
};

export default VirtualTryon;
