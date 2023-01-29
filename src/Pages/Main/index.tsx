import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../icons/search-icon.svg';
import banner from '../../images/banner.png';

import SelectCategoryBar from '../../Components/SelectCategoryBar';
import GridImageContainer from '../../Components/GridImageContainer';
import { getImageInfo, getImageInfoList } from '../../func';
import BottomNavigation from '../../Components/BottomNavigator';
import { PaddingBox } from '../../styles';

const Main = () => {
  const nav = useNavigate();
  const itemList = [
    {
      id: '0x',
      title: 'NFT',
      price: 1000,
      info: 'Lorem Ipsum',
      resolution: '1280x720 ~ 2560x1440',
      creator: 'SH.Kim',
    },
    {
      id: '0x1',
      title: 'NFT-Shard-01',
      price: 1000,
      info: 'Lorem Ipsum',
      resolution: '1280x720 ~ 2560x1440',
      creator: 'SH.Kim',
    },
    {
      id: '0x2',
      title: 'NFT-Shard-02',
      price: 1000,
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
        overflow: 'auto',
      }}
    >
      <PaddingBox>
        <img style={{ marginLeft: 'auto', marginBottom: '32px' }} src={searchIcon} alt="search" />

        <img src={banner} alt="banner" style={{ marginBottom: '32px' }} />

        <span style={{ fontSize: '20px', marginBottom: '-6px' }}>Projects you`ll love</span>
      </PaddingBox>
      <div style={{ width: '100%' }}>
        <SelectCategoryBar data={['Recommended', 'Lifestyle', 'Future', 'Normal']} />
      </div>

      <GridImageContainer itemList={itemList} routeUrl="/images" />
      <PaddingBox>
        <BottomNavigation />
      </PaddingBox>
    </div>
  );
};

export default Main;
