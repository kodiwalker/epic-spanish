import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import LibraryPage from './components/Library/LibraryPage';
import CreateStoryPage from './components/CreateStory/CreateStoryPage';
import AccountPage from './components/Account/AccountPage';
import ErrorPage from './components/ErrorPage';


export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/library" element={<ProtectedRoute element={<LibraryPage />} />} />
          <Route path="/create" element={<ProtectedRoute element={<CreateStoryPage />} />} />
          <Route path="/account" element={<ProtectedRoute element={<AccountPage />} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

