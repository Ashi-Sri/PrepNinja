import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, Square } from 'lucide-react';

const SpeechToTextAnalyzer = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  
  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };
      
      recognitionRef.current.onerror = (event) => {
        setError(`Error: ${event.error}`);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    } else {
      setError("Your browser doesn't support the Web Speech API");
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (transcript) {
        analyzeText(transcript);
      }
    } else {
      setAnalysis(null);
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  const resetAll = () => {
    setIsListening(false);
    setTranscript('');
    setAnalysis(null);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
  
  const analyzeText = (text) => {
    // Calculate fluency score
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    const uniqueWordCount = uniqueWords.size;
    const lexicalDiversity = uniqueWordCount / wordCount || 0;
    
    // Calculate clarity score
    const avgWordLength = words.join('').length / wordCount || 0;
    const longPauses = (text.match(/\.{3,}|,\s+|\.\s+|\?\s+/g) || []).length;
    const fillerWords = (text.match(/\b(um|uh|like|you know|sort of|kind of)\b/gi) || []).length;
    
    // The more filler words and pauses, the lower the clarity score
    const clarityScore = Math.max(1, Math.min(10, 10 - (fillerWords / (wordCount || 1) * 20) - (longPauses / (wordCount || 1) * 10)));
    
    // Confidence score based on lexical diversity and lack of filler words
    const confidenceScore = Math.max(1, Math.min(10, lexicalDiversity * 10 - (fillerWords / (wordCount || 1) * 15)));
    
    // Fluency score based on word count and average word length
    const fluencyScore = Math.max(1, Math.min(10, (wordCount / 30) * 5 + (lexicalDiversity * 5)));
    
    setAnalysis({
      fluency: fluencyScore.toFixed(1),
      clarity: clarityScore.toFixed(1),
      confidence: confidenceScore.toFixed(1),
      wordCount,
      uniqueWordCount,
      fillerWords,
      longPauses
    });
  };
  
  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 8) return 'text-green-600';
    if (numScore >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Speech-to-Text Analysis & Scoring</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={toggleListening}
          className={`flex items-center px-4 py-2 rounded-lg ${
            isListening 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="mr-2 h-5 w-5" /> Stop Recording
            </>
          ) : (
            <>
              <Mic className="mr-2 h-5 w-5" /> Start Recording
            </>
          )}
        </button>
        
        <button
          onClick={resetAll}
          className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          <Square className="mr-2 h-5 w-5" /> Reset
        </button>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Transcript:</h2>
        <div 
          className={`p-4 min-h-32 rounded-lg ${
            isListening ? 'bg-gray-100 border-2 border-blue-400' : 'bg-gray-50 border border-gray-300'
          }`}
        >
          {transcript || (isListening ? 'Speak now...' : 'Click "Start Recording" to begin')}
        </div>
      </div>
      
      {analysis && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Fluency</h3>
              <p className={`text-4xl font-bold ${getScoreColor(analysis.fluency)}`}>
                {analysis.fluency}/10
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Based on speech flow and word variety
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Clarity</h3>
              <p className={`text-4xl font-bold ${getScoreColor(analysis.clarity)}`}>
                {analysis.clarity}/10
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Based on pauses and filler words
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Confidence</h3>
              <p className={`text-4xl font-bold ${getScoreColor(analysis.confidence)}`}>
                {analysis.confidence}/10
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Based on vocabulary diversity and delivery
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Detailed Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Word Count</p>
                <p className="text-lg font-semibold">{analysis.wordCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unique Words</p>
                <p className="text-lg font-semibold">{analysis.uniqueWordCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Filler Words</p>
                <p className="text-lg font-semibold">{analysis.fillerWords}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pauses</p>
                <p className="text-lg font-semibold">{analysis.longPauses}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechToTextAnalyzer;