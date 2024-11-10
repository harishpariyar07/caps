import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import Button from '../components/Button';
import { Camera, Upload } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

const TakeTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [model, setModel] = useState(null);
  const [actions, setActions] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        const loadedModel = await tf.loadLayersModel('/ml_model_tfjs/model.json', { strict: false });
        setModel(loadedModel);
        const response = await fetch('/ISL_actions.json');
        const loadedActions = await response.json();
        setActions(loadedActions);
      } catch (error) {
        console.error('Failed to load model:', error);
      }
    }
    loadModel();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => chunks.push(event.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideo(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }, 5000);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRecordedVideo(URL.createObjectURL(file));
    }
  };

  const extractKeypoints = (pose) => {
    if (!pose || !pose.keypoints) return new Array(258).fill(0);
    
    const keypoints = pose.keypoints.map(kp => [kp.x, kp.y, kp.score]);
    const flattened = keypoints.flat();
    
    // Ensure the output has 258 elements (adjust as needed)
    return flattened.concat(new Array(258 - flattened.length).fill(0));
  };

  const analyzeSign = async () => {
    if (!model || !recordedVideo) {
      console.error('Model not loaded or no video recorded');
      return;
    }
    
    setIsAnalyzing(true);
    setPrediction(null);

    try {
      const videoElement = document.createElement('video');
      videoElement.src = recordedVideo;
      await videoElement.play();

      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
      
      const sequence = [];
      for (let i = 0; i < 20; i++) {
        videoElement.currentTime = i * videoElement.duration / 20;
        await new Promise(resolve => videoElement.addEventListener('seeked', resolve, { once: true }));
        const poses = await detector.estimatePoses(videoElement);
        const keypoints = extractKeypoints(poses[0]);
        sequence.push(keypoints);
      }

      const input = tf.tensor3d([sequence]);
      const predictionTensor = await model.predict(input);
      const predictionData = await predictionTensor.data();
      const predictedIndex = predictionData.indexOf(Math.max(...predictionData));
      const predictedSign = actions[predictedIndex];
      setPrediction(`Predicted sign: ${predictedSign}`);

    } catch (error) {
      console.error('Error analyzing sign:', error);
      setPrediction('Error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Take Sign Language Test</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Record Video</CardTitle>
          </CardHeader>
          <CardContent>
            <video ref={videoRef} className="w-full mb-4" autoPlay muted />
            {!isRecording ? (
              <Button onClick={startRecording} className="w-full">
                <Camera className="mr-2 h-4 w-4" /> Start Recording (5s)
              </Button>
            ) : (
              <Button disabled className="w-full bg-red-500">
                Recording...
              </Button>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="mb-4"
            />
            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" /> Upload Video
            </Button>
          </CardContent>
        </Card>
      </div>
      {recordedVideo && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recorded Video</h2>
          <video src={recordedVideo} controls className="w-full" />
          <Button 
            onClick={analyzeSign} 
            disabled={!model || isAnalyzing} 
            className="mt-4 w-full"
          >
            {isAnalyzing ? 'Analyzing...' : 'Predict Sign'}
          </Button>
          {prediction && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-bold">Prediction Result:</h3>
              <p>{prediction}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TakeTest;