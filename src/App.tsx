import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Login } from './Pages/Login';
import { loginState } from './states/loginState';
import 'react-loading-skeleton/dist/skeleton.css';

import Main from './Pages/Main';
import ImageDetail from './Pages/ImageDetail';
import Upload from './Pages/UploadNFT';
import Profile from './Pages/Profile';
import UploadList from './Pages/Profile/UploadList';
import PurchaseList from './Pages/Profile/PurchaseList';
import BuyNFT from './Pages/ImageDetail/BuyNFT';
import ReportNFT from './Pages/ImageDetail/ReportNFT';
import ReportList from './Pages/Profile/ReportList';

const App = () => {
  useEffect(() => {
    if (window.location.href !== 'http://localhost:3000/') window.location.href = 'http://localhost:3000/';
  }, []);

  const { isLogin } = useRecoilValue(loginState);
  if (!isLogin) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/images/:id" element={<ImageDetail />} />
        <Route path="/images/:id/reportNFT" element={<ReportNFT />} />
        <Route path="/images/:id/buyNFT" element={<BuyNFT />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/uploadList/:id" element={<UploadList />} />
        <Route path="/profile/purchaseList/:id" element={<PurchaseList />} />
        <Route path="/profile/reportList/:id" element={<ReportList />} />

        <Route path="/uploadNFT" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
