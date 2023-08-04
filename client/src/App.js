import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import withAuthentication from './components/withAuthentication';
import HomePage from './components/Home/HomePage';
import LoginPage from './components/Login/LoginPage';
import SignupPage from './components/Signup/SignupPage';
import LibraryPage from './components/Library/LibraryPage';
import CreateStoryPage from './components/CreateStory/CreateStoryPage';
import AccountPage from './components/Account/AccountPage';

const AuthenticatedLibraryPage = withAuthentication(LibraryPage);
const AuthenticatedCreateStoryPage = withAuthentication(CreateStoryPage);
const AuthenticatedAccountPage = withAuthentication(AccountPage);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/library" element={<AuthenticatedLibraryPage />} />
        <Route path="/create" element={<AuthenticatedCreateStoryPage />} />
        <Route path="/account" element={<AuthenticatedAccountPage />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Routes>
    </Router>
  );
}
