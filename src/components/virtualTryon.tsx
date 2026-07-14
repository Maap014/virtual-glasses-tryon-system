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

    if (!video || !faceLandmarker) {
      animationFrameRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(predictWebcam);
      return;
    }

    if (lastVideoTimeRef.current !== video.currentTime) {
      lastVideoTimeRef.current = video.currentTime;

      const results = faceLandmarker.detectForVideo(video, performance.now());

      console.log("Face Landmarker results:", results);

      if (results.faceLandmarks.length > 0) {
        console.log("Face detected");
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
        height={400}
        width={620}
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
    </>
  );
};

export default VirtualTryon;
