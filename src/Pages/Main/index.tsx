import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SelectCategoryBar from '../../Components/SelectCategoryBar';
import HeaderContainer from '../../Components/Header/HeaderContainer';
import SearchHeader from '../../Components/Header/SearchHeader';
import GridImageContainer from '../../Components/GridImageContainer';
import { getNFT, getNFTList } from '../../func';

const Main = () => {
  const nav = useNavigate();
  const itemList = [
    {
      id: '0x',
      title: 'NFT',
      price: '1000$',
      info: 'Lorem Ipsum',
      resolution: '1280x720 ~ 2560x1440',
      creator: 'SH.Kim',
    },
    {
      id: '0x1',
      title: 'NFT-Shard-01',
      price: '1000$',
      info: 'Lorem Ipsum',
      resolution: '1280x720 ~ 2560x1440',
      creator: 'SH.Kim',
    },
    {
      id: '0x2',
      title: 'NFT-Shard-02',
      price: '1000$',
      info: 'Lorem Ipsum',
      resolution: '1280x720 ~ 2560x1440',
      creator: 'SH.Kim',
    },
  ];

  useEffect(() => {
    getNFTList();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <HeaderContainer>
        <SearchHeader />
      </HeaderContainer>
      <SelectCategoryBar data={['Recommend', 'Category', 'Category', 'Category']} />
      <GridImageContainer itemList={itemList} routeUrl="/images" />
      <div
        style={{
          display: 'flex',
          marginTop: 'auto',
          padding: '16px',
          justifyContent: 'space-between',
          backgroundColor: 'yellow',
          color: 'black',
          fontSize: '24px',
        }}
      >
        <span style={{ marginRight: '10px' }}>home</span>
        <Link to="/uploadNFT" style={{ marginRight: '10px' }}>
          upload
        </Link>
        <Link to="/profile">profile</Link>
      </div>
    </div>
  );
};

export default Main;
