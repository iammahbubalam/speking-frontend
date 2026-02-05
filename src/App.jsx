import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AppLayout from './layouts/AppLayout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import AdminLayout from './layouts/AdminLayout';
import PTELayout from './layouts/PTELayout';
import IELTSLayout from './layouts/IELTSLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';

// PTE Module Pages
import PTEHub from './pages/pte/PTEHub';
import MockLanding from './pages/pte/mock/MockLanding';
import MockExam from './pages/pte/mock/MockExam';
import MockResults from './pages/pte/mock/MockResults';
import PTESpeaking from './pages/pte/sections/PTESpeaking';
import PTEReading from './pages/pte/sections/PTEReading';
import PTEListening from './pages/pte/sections/PTEListening';
import PTEWriting from './pages/pte/sections/PTEWriting';

// IELTS Module Pages
import IELTSHub from './pages/ielts/IELTSHub';
import IELTSMockLanding from './pages/ielts/mock/IELTSMockLanding';
import IELTSExam from './pages/ielts/mock/IELTSExam';

// Speaking Module Pages
import SpeakingHub from './pages/speaking/SpeakingHub';
import TrackLevels from './pages/speaking/TrackLevels';
import SpeakingSession from './pages/SpeakingSession';
import PronunciationLab from './pages/speaking/PronunciationLab';
import ProgressDashboard from './pages/speaking/ProgressDashboard';
import QuickPractice from './pages/speaking/QuickPractice';

// Admin Pages
import QuestionBank from './pages/admin/QuestionBank';
import StudentList from './pages/admin/StudentList';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RequireAuth from './components/auth/RequireAuth';

// Placeholder Pages
const AdminDashboard = () => <div className="text-white"><h2 className="text-3xl font-bold mb-4">Overview</h2><p>System Status: Optimal</p></div>;
const IELTSMock = () => <div className="flex items-center justify-center h-full text-2xl">IELTS Mock Test Interface</div>;

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<LoginPage />} />
          </Route>

          {/* Main Student APP - Protected */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="leaderboard" element={<Leaderboard />} />

              {/* Speaking Module Routes */}
              <Route path="speaking" element={<SpeakingHub />} />
              <Route path="speaking/track/:trackId" element={<TrackLevels />} />
              <Route path="speaking/level/:levelId" element={<SpeakingSession />} />
              <Route path="speaking/pronunciation" element={<PronunciationLab />} />
              <Route path="speaking/progress" element={<ProgressDashboard />} />
              <Route path="speaking/quick" element={<QuickPractice />} />

              {/* PTE Module Routes */}
              <Route path="pte" element={<PTEHub />} />
              <Route path="pte/mock" element={<MockLanding />} />
              <Route path="pte/mock/exam" element={<MockExam />} />
              <Route path="pte/mock/results" element={<MockResults />} />
              <Route path="pte/speaking" element={<PTESpeaking />} />
              <Route path="pte/speaking/:questionType" element={<PTESpeaking />} />
              <Route path="pte/reading" element={<PTEReading />} />
              <Route path="pte/reading/:questionType" element={<PTEReading />} />
              <Route path="pte/listening" element={<PTEListening />} />
              <Route path="pte/listening/:questionType" element={<PTEListening />} />
              <Route path="pte/writing" element={<PTEWriting />} />
              <Route path="pte/writing/:questionType" element={<PTEWriting />} />

              {/* IELTS Module Routes */}
              <Route path="ielts" element={<IELTSHub />} />
              <Route path="ielts/mock" element={<IELTSMockLanding />} />
              <Route path="ielts/mock/exam" element={<IELTSExam />} />
            </Route>
          </Route>

          {/* Admin Portal - Protected */}
          <Route path="/admin" element={<RequireAuth />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="questions" element={<QuestionBank />} />
              <Route path="students" element={<StudentList />} />
            </Route>
          </Route>



        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
