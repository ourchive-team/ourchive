import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../icons/search-icon.svg';

import SelectCategoryBar from '../../Components/SelectCategoryBar';
import GridImageContainer from '../../Components/GridImageContainer';
import { getImageInfo, getImageInfoList } from '../../func';
import BottomNavigation from '../../Components/BottomNavigation';

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
    getImageInfoList();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '16px',
        overflow: 'auto',
      }}
    >
      <img style={{ marginLeft: 'auto', marginBottom: '16px' }} src={searchIcon} alt="search" />
      <span style={{ fontSize: '20px', marginBottom: '10px' }}>Projects you`ll love</span>
      <SelectCategoryBar data={['Recommended', 'Lifestyle', 'Future', 'Normal']} />
      <span style={{ fontSize: '16px', marginTop: '10px' }}>Click Image!</span>

      <GridImageContainer itemList={itemList} routeUrl="/images" />
      <BottomNavigation />
    </div>
  );
};

export default Main;
