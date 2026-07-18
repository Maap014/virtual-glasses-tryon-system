"use client";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

interface VirtualTryOnProps {
  onCameraError: (message: string) => void;
}

const VirtualTryon = ({ onCameraError }: VirtualTryOnProps) => {
  const webcamRef = useRef<Webcam | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);

  const [isMediaPipeReady, setIsMediaPipeReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glassesImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const glassesImage = new Image();

    glassesImage.src = "/eyewears/glasses8.png";

    glassesImage.onload = () => {
      glassesImageRef.current = glassesImage;

      console.log("Glasses image loaded successfully");
    };

    glassesImage.onerror = () => {
      console.error("Failed to load glasses image");
    };
  }, []);

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
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const glassesImage = glassesImageRef.current;

    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (lastVideoTimeRef.current !== video.currentTime) {
      lastVideoTimeRef.current = video.currentTime;

      const results = faceLandmarker.detectForVideo(video, performance.now());

      //   console.log("Face Landmarker results:", results);

      if (results.faceLandmarks.length > 0) {
        // console.log("Face detected");

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
          const widthScale = 1.8;

          const glassesWidth = eyeDistance * widthScale;

          // Preserve the PNG's original width-to-height proportions.
          const glassesHeight =
            glassesWidth *
            (glassesImage.naturalHeight / glassesImage.naturalWidth);

          // Fine-tuning values.
          const horizontalOffset = glassesWidth * 0.02;
          const verticalOffset = glassesHeight * 0.01;

          // Calculate the tilt between the two eye landmarks.
          let angle = Math.atan2(leftY - rightY, leftX - rightX);

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

          //  Start drawing a new dot
          ctx.beginPath();

          // Draw a small circle at this landmark position
          ctx.arc(x, y, 1, 0, Math.PI * 2);

          // Fill the circle so it becomes visible
          ctx.fillStyle = "transparent";
          ctx.fill();
        });
      } else {
        console.log("No face detected.");
      }
    }

    animationFrameRef.current = requestAnimationFrame(predictWebcam);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored
        videoConstraints={{ facingMode: "user" }}
        onUserMedia={() => {
          if (isMediaPipeReady) {
            predictWebcam();
          }
        }}
        onUserMediaError={(error) => {
          onCameraError(
            "Camera access was blocked. Please allow camera permission in your browser and refresh the page.",
          );
        }}
        className=" rounded-3xl overflow-hidden border border-border"
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      ></canvas>
    </>
  );
};

export default VirtualTryon;
