import * as FaceMesh from "@mediapipe/face_mesh";
import React, { useRef, useEffect, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { drawConnectors } from "@mediapipe/drawing_utils";

function createFaceMesh(): FaceMesh.FaceMesh {
  const faceMesh = new FaceMesh.FaceMesh();
  faceMesh.setOptions({
    maxNumFaces: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
  return faceMesh;
}

function Apptst() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const connect = drawConnectors;
  let camera: cam.Camera | null = null;

  const [faceDetected, setFaceDetected] = useState<boolean>(false);

  useEffect(() => {
    const setupFaceMesh = async () => {
      const faceMesh: FaceMesh.FaceMesh = createFaceMesh();

      faceMesh.onResults((results) => {
        const videoWidth = webcamRef.current?.video!.videoWidth;
        const videoHeight = webcamRef.current?.video!.videoHeight;

        if (videoWidth && videoHeight) {
          const canvasElement = canvasRef.current!;
          const canvasCtx = canvasElement.getContext("2d");

          if (canvasCtx) {
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
              results.image,
              0,
              0,
              canvasElement.width,
              canvasElement.height
            );

            if (results.multiFaceLandmarks) {
              setFaceDetected(true);

              for (const landmarks of results.multiFaceLandmarks) {
                connect(canvasCtx, landmarks, FaceMesh.FACEMESH_TESSELATION, {
                  color: "#eae8fd",
                  lineWidth: 1,
                });
              }
            } else {
              setFaceDetected(false);
              console.log("No face detected");
            }
          }
        }
      });

      if (webcamRef.current) {
        camera = new cam.Camera(webcamRef.current.video!, {
          onFrame: async () => {
            const videoWidth = webcamRef.current?.video!.videoWidth;
            const videoHeight = webcamRef.current?.video!.videoHeight;

            canvasRef.current!.width = videoWidth || 0;
            canvasRef.current!.height = videoHeight || 0;

            await faceMesh.send({ image: webcamRef.current!.video! });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    };

    setupFaceMesh();

    return () => {
      if (camera) {
        camera.stop();
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <center>
          <div className="App">
            <Webcam
              ref={webcamRef}
              style={{
                textAlign: "center",
                zIndex: 9,
                width: "300px",
                height: "auto",
              }}
            />
            <div
              className="face_indicator"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                backgroundColor: faceDetected ? "green" : "red",
              }}
            ></div>
            <canvas
              ref={canvasRef}
              className="face_canvas"
              style={{
                zIndex: 10,
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }}
            ></canvas>
          </div>
        </center>
        <p>{faceDetected ? "Face detected" : "No face detected"}</p>
      </header>
    </div>
  );
}

export default Apptst;
