import React from 'react';
import styled from 'styled-components';

import SelectCategoryBar from '../../Components/SelectCategoryBar';
import HeaderContainer from '../../Components/Header/HeaderContainer';
import SearchHeader from '../../Components/Header/SearchHeader';

const ItemCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Main = () => {
  const itemList = [
    { title: 'NFT', price: '1000$', info: 'Lorem Ipsum', resolution: '1280x720 ~ 2560x1440', creator: 'SH.Kim' },
    {
      title: 'NFT-Shard-01',
      price: '1000$',
      info: 'Lorem Ipsum',
      resolution: '1280x720 ~ 2560x1440',
      creator: 'SH.Kim',
    },
    {
      title: 'NFT-Shard-02',
      price: '1000$',
      info: 'Lorem Ipsum',
      resolution: '1280x720 ~ 2560x1440',
      creator: 'SH.Kim',
    },
  ];
  return (
    <div>
      <HeaderContainer>
        <SearchHeader />
      </HeaderContainer>
      <SelectCategoryBar data={['Recommend', 'Category', 'Category', 'Category']} />
      <div>
        {itemList.map(el => {
          return (
            <ItemCardDescription>
              <div style={{ width: '163px', height: '143px', background: '#F2F2F2' }} />
              {Object.entries(el).map(itemData => {
                const [key, value] = itemData;
                return (
                  <div style={{ display: 'flex' }}>
                    <span style={{ marginRight: '4px' }}>{key}</span>
                    <span style={{ marginRight: '10px' }}>{value}</span>
                  </div>
                );
              })}
            </ItemCardDescription>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
