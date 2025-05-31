import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/preparation');
  };
  const handleSpeech = () => {
    navigate('/speech');
  };
  const handleCommunityForum = () => {
    navigate('/CommunityForum');
  };
  const handleInterviewRecorder = () => {
    navigate('/InterviewRecorder');
  };
  return (
    <>
      {/* Hero Section with Video */}
      <div className="home-container">
        <video autoPlay loop muted className="background-video">
          <source
            src="https://videos.pexels.com/video-files/8491290/8491290-uhd_2732_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="content">
          <h1 data-aos="fade-down">Welcome to <span>PrepNinja</span></h1>
          <p data-aos="fade-up">
          Your gateway to interview mastery—where preparation meets opportunity, and confidence transforms into success.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn" onClick={handleStartTest}>
              Start Preparation
            </button>
            <button className="cta-btn" onClick={handleSpeech}>Speech Analysis</button>
            <button className="cta-btn" onClick={handleCommunityForum}>Community Forum</button>
            <button className="cta-btn" onClick={handleInterviewRecorder}>Interview Recorder</button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="features" data-aos="fade-up">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Real-Time Performance</h3>
Get instant insights into your performance as you progress through the test, helping you stay on track and improve accuracy.
          </div>
          <div className="feature">
            <h3>Practice Questions</h3>
            <p>Practice questions for quick review and revision.</p>
          </div>
          <div className="feature">
            <h3>Role-Based System</h3>
            <p>Admin, Examiner & Student panels for smooth management.</p>
          </div>
          <div className="feature">
            <h3>Secure Authentication</h3>
            <p>JWT-based user authentication & data privacy.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials" data-aos="fade-up">
        <h2>What Our Users Say 💬</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"PrepNinja made my interview preparation so smooth! The feedback was on point!"</p>
            <h4>- Ayush Mehta</h4>
          </div>
          <div className="testimonial">
            <p>"The performance analytics helped me improve my weak areas. Absolutely loved the experience!"</p>
            <h4>- Priya Sharma</h4>
          </div>
          <div className="testimonial">
            <p>"I cracked my TCS interview thanks to PrepNinja's mock tests!"</p>
            <h4>- Rohan Singh</h4>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer>
        <p>© 2025 PrepNinja | by Ashi Srivastava</p>
        <div className="social-links">
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </footer>
    </>
  );
};

export default Home;
