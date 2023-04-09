import './App.css';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css';

import MainPage from './Pages/MainPage';
import ImageDetailsPage from './Pages/ImageDetailsPage';
import UploadPage from './Pages/UploadPage';
import ProfilePage from './Pages/ProfilePage';
import UploadList from './Pages/ProfilePage/UploadList';
import PurchaseList from './Pages/ProfilePage/DownloadList';
import PurchasePage from './Pages/ImageDetailsPage/PurchasePage';
import ReportPage from './Pages/ReportPage';
import ReportList from './Pages/ProfilePage/ReportList';
import NicknameRegistrationPage from './Pages/AuthPage/NicknameRegistrationPage';
import ProveList from './Pages/ProfilePage/ProveList';
import ProveOwnershipOfImagePage from './Pages/ProveOwnershipOfImagePage';
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
          <Route path="/images/:creator/:nickname/:title" element={<ImageDetailsPage />} />
          <Route path="/images/:creator/:nickname/:title/report" element={<ReportPage />} />
          <Route path="/images/:creator/:nickname/:title/purchase" element={<PurchasePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/upload-list" element={<UploadList />} />
          <Route path="/profile/download-list" element={<PurchaseList />} />
          <Route path="/profile/report-list" element={<ReportList />} />
          <Route path="/profile/provement-list" element={<ProveList />} />
          <Route path="/profile/provement-list/:creator/:nickname/:title" element={<ProveOwnershipOfImagePage />} />
          <Route path="/upload-image" element={<UploadPage />} />
        </Routes>
      </LoginWrapper>
    </BrowserRouter>
  );
};

export default App;
