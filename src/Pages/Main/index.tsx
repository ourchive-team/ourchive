import React from 'react';
import styled from 'styled-components';

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
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HeaderContainer>
        <SearchHeader />
      </HeaderContainer>
      <SelectCategoryBar data={['Recommend', 'Category', 'Category', 'Category']} />
      <GridImageContainer itemList={itemList} routeUrl="/images" />
    </div>
  );
};

export default Main;
