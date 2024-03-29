import './App.css';
import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './Pages/MainPage';
import ImageDetailsPage from './Pages/ImageDetailsPage';
import UploadPage from './Pages/UploadPage';
import ProfilePage from './Pages/ProfilePage';
import UploadListPage from './Pages/ProfilePage/UploadListPage';
import DownloadList from './Pages/ProfilePage/DownloadListPage';
import PurchasePage from './Pages/ImageDetailsPage/PurchasePage';
import ReportListPage from './Pages/ProfilePage/ReportListPage';
import NicknameRegistrationPage from './Pages/AuthPage/NicknameRegistrationPage';
import ProveListPage from './Pages/ProfilePage/ProveListPage';
import LoginWrapper from './Components/LoginWrapper';
import { LoginPage } from './Pages/AuthPage/LoginPage';

const App = () => {
  // ngrok test error
  // useEffect(() => {
  //   if (window.location.href !== 'http://localhost:3000/') window.location.href = 'http://localhost:3000/';
  // }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <LoginWrapper>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/nickname" element={<NicknameRegistrationPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/images/:creator/:nickname/:title" element={<ImageDetailsPage />} />
          <Route path="/images/:creator/:nickname/:title/purchase" element={<PurchasePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/upload-list" element={<UploadListPage />} />
          <Route path="/profile/download-list" element={<DownloadList />} />
          <Route path="/profile/report-list" element={<ReportListPage />} />
          <Route path="/profile/prove-list" element={<ProveListPage />} />
        </Routes>
      </LoginWrapper>
    </BrowserRouter>
  );
};

export default App;
