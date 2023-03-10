import './App.css';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { Types, AptosClient } from 'aptos';
import { Login } from './Pages/Login';
import 'react-loading-skeleton/dist/skeleton.css';

import Main from './Pages/Main';
import ImageDetail from './Pages/ImageDetail';
import Upload from './Pages/UploadImage';
import Profile from './Pages/Profile';
import UploadList from './Pages/Profile/UploadList';
import PurchaseList from './Pages/Profile/DownloadList';
import Purchase from './Pages/ImageDetail/Purchase';
import Report from './Pages/Report';
import ReportList from './Pages/Profile/ReportList';
import Nickname from './Pages/Login/Nickname';
import ProveList from './Pages/Profile/ProveList';
import ProveOwnershipOfImage from './Pages/ProveOwnershipOfImage';
import LoginWrapper from './Components/LoginWrapper';

const App = () => {
  // ngrok test error
  // useEffect(() => {
  //   if (window.location.href !== 'http://localhost:3000/') window.location.href = 'http://localhost:3000/';
  // }, []);

  // console.log(address, account?.sequence_number);
  return (
    <BrowserRouter>
      <LoginWrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/nickname" element={<Nickname />} />
          <Route path="/main" element={<Main />} />
          <Route path="/images/:creator/:nickname/:title" element={<ImageDetail />} />
          <Route path="/images/:creator/:nickname/:title/report" element={<Report />} />
          <Route path="/images/:creator/:nickname/:title/purchase" element={<Purchase />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/upload-list" element={<UploadList />} />
          <Route path="/profile/download-list" element={<PurchaseList />} />
          <Route path="/profile/report-list" element={<ReportList />} />
          <Route path="/profile/provement-list" element={<ProveList />} />
          <Route path="/profile/provement-list/:creator/:nickname/:title" element={<ProveOwnershipOfImage />} />
          <Route path="/upload-image" element={<Upload />} />
        </Routes>
      </LoginWrapper>
    </BrowserRouter>
  );
};

export default App;
