import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Store from './pages/Store';
import Leaderboard from './pages/Leaderboard';
import CommunityFeed from './pages/CommunityFeed';
import StudyGroupChat from './pages/StudyGroupChat';
import AIHub from './pages/AIHub';
import Settings from './pages/Settings';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store" element={<Store />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/communities" element={<CommunityFeed />} />
          <Route path="/study-group/:id" element={<StudyGroupChat />} />
          <Route path="/ai" element={<AIHub />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
