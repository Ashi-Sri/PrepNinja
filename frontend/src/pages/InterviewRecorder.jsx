import { useState, useRef, useEffect } from 'react';
import { Camera, Pause, Play, Upload, X, Check, Repeat, Send, List, Mic, AlertTriangle, BarChart, Copy, ArrowRight, HelpCircle } from 'lucide-react';

export default function InterviewRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  
  // New state variables for enhanced functionality
  const [interviewQuestions, setInterviewQuestions] = useState([
    "Tell me about yourself and your background.",
    "Why are you interested in this position?",
    "Describe a challenging situation you faced at work and how you handled it.",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in 5 years?"
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);
  const [audioOnly, setAudioOnly] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [savedRecordings, setSavedRecordings] = useState([]);
  const [recordingName, setRecordingName] = useState("");
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  // Request camera access and set up video stream
  const setupCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: !audioOnly, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraReady(true);
        };
      }
    } catch (err) {
      setError(`${audioOnly ? 'Microphone' : 'Camera'} access denied. Please check your permissions.`);
      console.error(`Error accessing ${audioOnly ? 'microphone' : 'camera'}:`, err);
    }
  };
  
  // Initialize camera on component mount or when audioOnly changes
  useEffect(() => {
    setupCamera();
    
    return () => {
      // Clean up camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioOnly]);

  // Start recording with countdown
  const startRecording = () => {
    if (!streamRef.current) return;
    
    setCountdownTimer(3);
    
    countdownRef.current = setInterval(() => {
      setCountdownTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          startActualRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Actual recording start after countdown
  const startActualRecording = () => {
    setRecordedChunks([]);
    setRecordingTime(0);
    setRecordedVideo(null);
    setFeedback(null);
    setTranscriptData(null);
    
    try {
      const options = { mimeType: 'video/webm' };
      const mediaRecorder = new MediaRecorder(streamRef.current, options);
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        setRecordedVideo(videoURL);
      };
      
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setIsPaused(false);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Failed to start recording. Your browser might not support the required features.");
    }
  };

  // Pause recording
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(timerRef.current);
    }
  };

  // Resume recording
  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Upload video to server and get feedback
  const uploadVideo = () => {
    if (recordedChunks.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    
    // Create a blob from recorded chunks
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    
    // Mock upload with progress - in a real app, replace with actual API call
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          
          // Mock feedback response after "upload"
          setTimeout(() => {
            setFeedback({
              score: 8.5,
              strengths: [
                "Excellent communication skills",
                "Clear articulation of experience",
                "Strong problem-solving approach"
              ],
              improvements: [
                "Consider providing more specific examples",
                "Maintain more consistent eye contact",
                "Reduce filler words (um, like, you know)"
              ],
              keyMetrics: {
                confidence: 85,
                clarity: 90,
                conciseness: 75,
                engagement: 80
              }
            });
            
            // Generate mock transcript
            setTranscriptData({
              text: "Hi, my name is Alex and I'm really excited about this opportunity. I have over five years of experience in software development with a focus on front-end technologies. In my previous role at ABC Tech, I led a team of three developers to deliver a major product redesign that increased user engagement by 40%. I'm particularly interested in this position because it aligns with my passion for creating accessible user interfaces and solving complex technical challenges...",
              fillerWordCount: 12,
              speakingPace: "85 words per minute",
              keyPhrases: ["user experience", "team leadership", "problem-solving"]
            });
          }, 1000);
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Reset everything
  const resetRecording = () => {
    if (recordedVideo) {
      URL.revokeObjectURL(recordedVideo);
    }
    
    setRecordedChunks([]);
    setRecordingTime(0);
    setRecordedVideo(null);
    setFeedback(null);
    setTranscriptData(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadComplete(false);
  };
  
  // Save current recording
  const saveRecording = () => {
    if (!recordedVideo || !recordingName.trim()) return;
    
    const newSavedRecording = {
      id: Date.now(),
      name: recordingName.trim(),
      url: recordedVideo,
      duration: recordingTime,
      date: new Date().toISOString(),
      question: interviewQuestions[currentQuestionIndex]
    };
    
    setSavedRecordings([...savedRecordings, newSavedRecording]);
    setRecordingName("");
  };
  
  // Go to next question
  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => 
      prev < interviewQuestions.length - 1 ? prev + 1 : prev
    );
    resetRecording();
  };
  
  // Go to previous question
  const prevQuestion = () => {
    setCurrentQuestionIndex((prev) => 
      prev > 0 ? prev - 1 : prev
    );
    resetRecording();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (recordedVideo) {
        URL.revokeObjectURL(recordedVideo);
      }
    };
  }, [recordedVideo]);

  // Effect to create video URL after recording finishes
  useEffect(() => {
    if (recordedChunks.length > 0 && !isRecording && !recordedVideo) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
    }
  }, [recordedChunks, isRecording, recordedVideo]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Interview Response Trainer</h2>
        <div className="flex space-x-2">
          <button 
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
            onClick={() => setShowHelp(!showHelp)}
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          <button 
            className={`flex items-center px-3 py-1 rounded ${audioOnly ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              if (!isRecording) {
                setAudioOnly(!audioOnly);
              }
            }}
          >
            <Mic className="h-4 w-4 mr-1" />
            Audio Only
          </button>
        </div>
      </div>
      
      {showHelp && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">How to use this tool:</h3>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700">
            <li>Select a question from the list or use the current one</li>
            <li>Click "Start Recording" to begin a 3-second countdown</li>
            <li>Answer the question as you would in a real interview</li>
            <li>Submit your response for AI feedback</li>
            <li>Review your performance metrics and suggestions</li>
            <li>Save responses to track your progress over time</li>
          </ol>
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {error}
          </p>
          <button 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={setupCamera}
          >
            Try Again
          </button>
        </div>
      )}
      
      <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-sm text-gray-500 mb-1">Current Question:</h3>
          <p className="text-gray-800 font-medium">{interviewQuestions[currentQuestionIndex]}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded disabled:opacity-50"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0 || isRecording}
          >
            <ArrowRight className="h-5 w-5 transform rotate-180" />
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded disabled:opacity-50"
            onClick={nextQuestion}
            disabled={currentQuestionIndex === interviewQuestions.length - 1 || isRecording}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
            onClick={() => setShowQuestions(!showQuestions)}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {showQuestions && (
        <div className="mb-4 bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Question Bank:</h3>
          <ul className="space-y-2">
            {interviewQuestions.map((question, index) => (
              <li 
                key={index}
                className={`p-2 rounded cursor-pointer ${index === currentQuestionIndex ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  if (!isRecording) {
                    setCurrentQuestionIndex(index);
                    setShowQuestions(false);
                  }
                }}
              >
                {question}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <input
              type="text"
              placeholder="Add your own question..."
              className="w-full p-2 border border-gray-300 rounded"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setInterviewQuestions([...interviewQuestions, e.target.value.trim()]);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      )}
      
      <div className="mb-6 bg-gray-900 rounded-lg overflow-hidden relative">
        {countdownTimer > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <span className="text-white text-8xl font-bold">{countdownTimer}</span>
          </div>
        )}
        
        {!recordedVideo ? (
          audioOnly ? (
            <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <Mic className="mx-auto h-16 w-16 text-gray-400" />
                <p className="mt-4 text-gray-400">Audio-only mode enabled</p>
                {isRecording && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-gray-300">{formatTime(recordingTime)}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <video 
              ref={videoRef}
              className="w-full h-96 object-cover" 
              autoPlay 
              muted 
              playsInline
            />
          )
        ) : (
          <video 
            className="w-full h-96 object-cover"
            src={recordedVideo}
            controls
          />
        )}
        
        {isRecording && !audioOnly && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            {formatTime(recordingTime)}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {!cameraReady && !isRecording && !recordedVideo && (
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={setupCamera}
          >
            {audioOnly ? <Mic className="mr-2 h-5 w-5" /> : <Camera className="mr-2 h-5 w-5" />}
            Setup {audioOnly ? 'Microphone' : 'Camera'}
          </button>
        )}
        
        {cameraReady && !isRecording && !recordedVideo && (
          <button
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={startRecording}
          >
            {audioOnly ? <Mic className="mr-2 h-5 w-5" /> : <Camera className="mr-2 h-5 w-5" />}
            Start Recording
          </button>
        )}
        
        {isRecording && !isPaused && (
          <button
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={pauseRecording}
          >
            <Pause className="mr-2 h-5 w-5" />
            Pause
          </button>
        )}
        
        {isRecording && isPaused && (
          <button
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={resumeRecording}
          >
            <Play className="mr-2 h-5 w-5" />
            Resume
          </button>
        )}
        
        {isRecording && (
          <button
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            onClick={stopRecording}
          >
            <X className="mr-2 h-5 w-5" />
            Stop Recording
          </button>
        )}
        
        {recordedVideo && !isUploading && !uploadComplete && (
          <button
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={uploadVideo}
          >
            <Upload className="mr-2 h-5 w-5" />
            Submit for Feedback
          </button>
        )}
        
        {recordedVideo && (
          <button
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={resetRecording}
          >
            <Repeat className="mr-2 h-5 w-5" />
            Record Again
          </button>
        )}
        
        {recordedVideo && !uploadComplete && (
          <div className="flex items-center gap-2 ml-auto">
            <input 
              type="text" 
              placeholder="Name this recording"
              className="px-3 py-2 border border-gray-300 rounded"
              value={recordingName}
              onChange={(e) => setRecordingName(e.target.value)}
            />
            <button
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              onClick={saveRecording}
              disabled={!recordingName.trim()}
            >
              <Check className="mr-2 h-5 w-5" />
              Save
            </button>
          </div>
        )}
      </div>
      
      {isUploading && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Uploading and analyzing response: {uploadProgress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {uploadComplete && !feedback && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
          <div className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <p>Response uploaded successfully! Analyzing feedback...</p>
          </div>
        </div>
      )}
      
      {feedback && (
        <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Interview Feedback</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">Overall Score</span>
              <span className="text-xl font-bold text-blue-600">{feedback.score}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(feedback.score/10) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(feedback.keyMetrics).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 capitalize">{key}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-medium text-gray-800">{value}%</span>
                  <div className="w-2/3 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
            <ul className="list-disc pl-5 space-y-1">
              {feedback.strengths.map((strength, index) => (
                <li key={index} className="text-gray-700">{strength}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-amber-700 mb-2">Areas for Improvement</h4>
            <ul className="list-disc pl-5 space-y-1">
              {feedback.improvements.map((improvement, index) => (
                <li key={index} className="text-gray-700">{improvement}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between">
            <button 
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              {showTranscript ? "Hide Transcript" : "Show Transcript"}
            </button>
            
            <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <Send className="mr-2 h-5 w-5" />
              Request Expert Coaching
            </button>
          </div>
        </div>
      )}
      
      {showTranscript && transcriptData && (
        <div className="mt-4 bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Response Transcript</h3>
            <button 
              className="flex items-center text-gray-500 hover:text-blue-600"
              onClick={() => {
                navigator.clipboard.writeText(transcriptData.text);
                alert("Transcript copied to clipboard!");
              }}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </button>
          </div>
          
          <div className="mb-4">
            <div className="p-4 bg-gray-50 rounded text-gray-700 text-sm">
              {transcriptData.text}
            </div>
            
            {recordedVideo && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Response Video</h4>
                <div className="aspect-video bg-black rounded overflow-hidden">
                  <video 
                    src={recordedVideo}
                    className="w-full h-full object-contain" 
                    controls
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <div className="text-xs text-gray-500">
                    Watch your video while reading the transcript to improve your delivery
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-500">Speaking Pace</div>
              <div className="font-medium mt-1">{transcriptData.speakingPace}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-500">Filler Words</div>
              <div className="font-medium mt-1">{transcriptData.fillerWordCount} instances</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-500">Key Phrases</div>
              <div className="font-medium mt-1 text-xs">
                {transcriptData.keyPhrases.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {savedRecordings.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-2">Saved Recordings</h3>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            {savedRecordings.map((recording) => (
              <div key={recording.id} className="p-4 flex items-center">
                <div className="flex-1">
                  <h4 className="font-medium">{recording.name}</h4>
                  <p className="text-sm text-gray-500">{new Date(recording.date).toLocaleDateString()} • {formatTime(recording.duration)}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{recording.question}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                    onClick={() => {
                      // In a real app, this would load the recording
                      setRecordedVideo(recording.url);
                      setRecordingTime(recording.duration);
                    }}
                  >
                    <Play className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                    onClick={() => {
                      // Remove from saved recordings
                      setSavedRecordings(savedRecordings.filter(r => r.id !== recording.id));
                    }}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Practice makes perfect! Record your responses to interview questions and receive AI-powered feedback to improve your chances of landing your dream job.</p>
      </div>
    </div>
  );
}