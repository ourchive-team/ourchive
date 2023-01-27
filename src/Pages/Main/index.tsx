import React from 'react';

import { useNavigate } from 'react-router-dom';

import SelectCategoryBar from '../../Components/SelectCategoryBar';
import HeaderContainer from '../../Components/Header/HeaderContainer';
import SearchHeader from '../../Components/Header/SearchHeader';
import GridImageContainer from '../../Components/GridImageContainer';

const Main = () => {
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
  const nav = useNavigate();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <button
        type="button"
        onClick={() => {
          nav('/upload');
        }}
      >
        go to upload
      </button>

      <HeaderContainer>
        <SearchHeader />
      </HeaderContainer>
      <SelectCategoryBar data={['Recommend', 'Category', 'Category', 'Category']} />
      <GridImageContainer itemList={itemList} routeUrl="/images" />
    </div>
  );
};

export default Main;
