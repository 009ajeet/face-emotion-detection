import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './App.css';

function App() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [currentEmotion, setCurrentEmotion] = useState('neutral');

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  const handleVideoPlay = () => {
    if (!canvasRef.current) {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvasRef.current = canvas;

      const videoContainer = videoRef.current.parentElement;
      videoContainer.appendChild(canvas);
    }

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };

    faceapi.matchDimensions(canvasRef.current, displaySize);

    const interval = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

        // Update the current emotion based on detection
        if (detections.length > 0 && detections[0].expressions) {
          const expressions = detections[0].expressions;
          let dominantEmotion = 'neutral';
          let maxConfidence = 0;

          Object.entries(expressions).forEach(([emotion, confidence]) => {
            if (confidence > maxConfidence) {
              maxConfidence = confidence;
              dominantEmotion = emotion;
            }
          });

          setCurrentEmotion(dominantEmotion);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  };

  const getEmojisForEmotion = (emotion) => {
    switch (emotion) {
      case 'happy':
        return ['😊', '😄', '😁', '🥳'];
      case 'sad':
        return ['😢', '😥', '😔', '😞'];
      case 'angry':
        return ['😠', '😡', '🤬', '👿'];
      case 'disgusted':
        return ['🤢', '🤮', '😖', '😫'];
      case 'surprised':
        return ['😲', '😮', '😯', '😱'];
      case 'fearful':
        return ['😨', '😰', '😧', '🙀'];
      default:
        return ['😐', '😶', '😑', '🙂'];
    }
  };

  return (
    <div className="app">
      <h1 data-text="Face Emotion Recognition">Face Emotion Recognition</h1>


      {/* Emoji background based on emotion */}
      <div className="emoji-background">
        {getEmojisForEmotion(currentEmotion).map((emoji, index) => (
          <div
            key={index}
            className={`floating-emoji ${currentEmotion}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 6 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="video-container">
        <video
          ref={videoRef}
          width="720"
          height="560"
          autoPlay
          muted
          onPlay={handleVideoPlay}
        />
      </div>

      <div className="current-emotion">
        {currentEmotion && (
          <div className="emotion-tag">
            Current emotion: <span>{currentEmotion}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;