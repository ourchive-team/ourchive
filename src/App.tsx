import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Login } from './Pages/Login';
import { loginState } from './states/loginState';
import 'react-loading-skeleton/dist/skeleton.css';

import Main from './Pages/Main';
import ImageDetail from './Pages/ImageDetail';
import Upload from './Pages/UploadImage';
import Profile from './Pages/Profile';
import UploadList from './Pages/Profile/UploadList';
import PurchaseList from './Pages/Profile/PurchaseList';
import BuyNFT from './Pages/ImageDetail/Purchase';
import Report from './Pages/ImageDetail/Report';
import ReportList from './Pages/Profile/ReportList';
import Nickname from './Pages/Login/Nickname';

const App = () => {
  // useEffect(() => {
  //   if (window.location.href !== 'http://localhost:3000/') window.location.href = 'http://localhost:3000/';
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/nickname" element={<Nickname />} />

        <Route path="/main" element={<Main />} />

        <Route path="/images/:id" element={<ImageDetail />} />
        <Route path="/images/:id/report" element={<Report />} />
        <Route path="/images/:id/purchase" element={<BuyNFT />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/upload-list" element={<UploadList />} />
        <Route path="/profile/purchase-list" element={<PurchaseList />} />
        <Route path="/profile/report-list" element={<ReportList />} />

        <Route path="/upload-image" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
