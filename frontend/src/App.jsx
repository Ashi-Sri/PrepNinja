import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExamList from './pages/ExamList';
import ExamDetails from './pages/ExamDetails';
import TakeExam from './pages/TakeExam';
import ExamResults from './pages/ExamResults';
import ExamHistory from './pages/ExamHistory';
import CreateExam from './pages/CreateExam';
import ManageExams from './pages/ManageExams';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import Preparation from './pages/Preparation';
import Speech from './pages/speech';
import CommunityForum from './pages/CommunityForum';
import InterviewRecorder from './pages/InterviewRecorder';
// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/about';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

// Separate layout logic
function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`min-h-screen ${isHomePage ? "" : "bg-gray-50"}`}>
      <Navbar />
      <div className={` px-4 ${isHomePage ? "" : " py-8"}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/exams" element={<ProtectedRoute><ExamList /></ProtectedRoute>} />
          <Route path="/exams/:id" element={<ProtectedRoute><ExamDetails /></ProtectedRoute>} />
          <Route path="/exams/:id/take" element={<ProtectedRoute><TakeExam /></ProtectedRoute>} />
          <Route path="/attempts/:id" element={<ProtectedRoute><ExamResults /></ProtectedRoute>} />
          {/* <Route path="/history" element={<ProtectedRoute><ExamHistory /></ProtectedRoute>} /> */}
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />  

          <Route path="/preparation" element={<ProtectedRoute><Preparation /></ProtectedRoute>} />
          <Route path="/speech" element={<ProtectedRoute><Speech /></ProtectedRoute>} />
          <Route path="/CommunityForum" element={<ProtectedRoute><CommunityForum /></ProtectedRoute>} />
          {/* Admin/Examiner Routes */}
          <Route path="/exams/create" element={<AdminRoute><CreateExam /></AdminRoute>} />
          <Route path="/exams/manage" element={<AdminRoute><ManageExams /></AdminRoute>} />

          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

          <Route path="/InterviewRecorder" element={<ProtectedRoute><InterviewRecorder /></ProtectedRoute>} />

          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
