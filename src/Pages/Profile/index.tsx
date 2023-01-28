import React from 'react';
import styled from 'styled-components';

import RenderImageList from '../../Components/RenderImageList';

const YellowCardBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  color: #fbfe67;
  flex-direction: column;
  border: 1px solid #7e8034;
  background-color: transparent;
  padding: 16px;
  border-radius: 8px;
  margin-right: 16px;

  :nth-last-child(1) {
    margin-right: 0px;
  }

  span:nth-child(1) {
    font-weight: 900;
    font-size: 15px;
  }
  span:nth-child(2) {
    font-weight: 400;
    font-size: 12px;
  }
`;

const Profile = () => {
  const itemList = [
    {
      id: '0x',
    },
    {
      id: '0x1',
    },
    {
      id: '0x2',
    },
    {
      id: '0x3',
    },
    {
      id: '0x4',
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ width: '143px', aspectRatio: '1/1', borderRadius: '50%', border: '1px solid white' }} />
      <span>H.Shelby</span>
      <span>I`m daily life artist</span>
      <span>user ID (0x2b...bsfs)</span>

      <div style={{ display: 'flex', width: '100%', padding: '16px' }}>
        <YellowCardBox>
          <span>326</span>
          <span>Upload</span>
        </YellowCardBox>
        <YellowCardBox>
          <span>34</span>
          <span>Buy</span>
        </YellowCardBox>
        <YellowCardBox>
          <span>$4269.1</span>
          <span>Profit</span>
        </YellowCardBox>
      </div>

      <span style={{ fontSize: '16px', marginBottom: '10px' }}>Click Upload/Purchase/Report Image!</span>

      <span>Upload List</span>
      <div style={{ display: 'flex', width: '100%', overflow: 'auto', padding: '16px' }}>
        <RenderImageList
          itemList={itemList}
          routeUrl="uploadList"
          skeletonWidth={100}
          skeletonHeight={100}
          hideDetails
        />
      </div>

      <span>Purchase List</span>
      <div style={{ display: 'flex', width: '100%', overflow: 'auto', padding: '16px' }}>
        <RenderImageList
          itemList={itemList}
          routeUrl="purchaseList"
          skeletonWidth={100}
          skeletonHeight={100}
          hideDetails
        />
      </div>

      <span>Report List</span>
      <div style={{ display: 'flex', width: '100%', overflow: 'auto', padding: '16px' }}>
        <RenderImageList
          itemList={itemList}
          routeUrl="reportList"
          skeletonWidth={100}
          skeletonHeight={100}
          hideDetails
        />
      </div>
    </div>
  );
};

export default Profile;
