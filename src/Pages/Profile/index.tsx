import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { TokenTypes } from 'aptos';
import profileIcon from '../../images/profile-icon.png';
import navIcon from '../../icons/prev.svg';

import RenderImageList from '../../Components/RenderImageList';
import { baseColor } from '../../styles';
import BottomNavigator from '../../Components/BottomNavigator';
import YellowBottomNavigator from '../../Components/YellowBottomNavigator';
import { addressState, nicknameState, publicKeyState } from '../../states/loginState';
import { getUploadedImageList } from '../../func';

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

  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [address, setAddress] = useRecoilState(addressState);
  const [publicKey] = useRecoilState(publicKeyState);
  const addressString = (address as unknown) as string;
  const renderAddressString = `${addressString?.slice(0, 4)}...${addressString?.slice(-4)}`;

  const [uploadList, setUploadList] = useState<TokenTypes.TokenDataId[] | null>(null);

  useEffect(() => {
    getUploadedImageList(addressString).then(data => {
      setUploadList(data);
    });
    console.log('hihi', uploadList);
  }, []);

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
      <span style={{ fontSize: '18px', padding: '16px' }}>My Profile</span>
      <div style={{ padding: '16px' }}>
        <img alt="profile-icon" src={profileIcon} style={{ width: '120px', height: '120px', borderRadius: '50%' }} />
      </div>
      <span style={{ fontSize: '24px', fontWeight: 700 }}>{(nickname as unknown) as string}</span>
      <span style={{ fontSize: '14px', padding: '8px', textAlign: 'center' }}>
        BA in fashion & graphic design tattoo, reiki&thetahealing master✨
      </span>
      <span style={{ color: baseColor.purple }}>{renderAddressString}</span>

      <div style={{ display: 'flex', width: '100%', padding: '16px', marginBottom: '28px' }}>
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

      <span style={{ fontSize: '16px', fontWeight: 700, paddingLeft: '16px', marginRight: 'auto' }}>Upload List</span>
      <div style={{ width: '100%', height: '100%', marginBottom: '24px' }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0px 16px', marginLeft: '-6px' }}>
          <RenderImageList
            itemList={[]}
            routeUrl="upload-list"
            routeUrlWithoutId
            skeletonWidth={100}
            skeletonHeight={100}
            style={{ wrapper: { padding: '6px' } }}
            hideDetails
          />
        </div>
      </div>

      <span style={{ fontSize: '16px', fontWeight: 700, paddingLeft: '16px', marginRight: 'auto' }}>Download List</span>
      <div style={{ width: '100%', height: '100%', marginBottom: '24px' }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0px 16px', marginLeft: '-6px' }}>
          <RenderImageList
            itemList={[]}
            routeUrl="download-list"
            routeUrlWithoutId
            skeletonWidth={100}
            skeletonHeight={100}
            style={{ wrapper: { padding: '6px' } }}
            hideDetails
          />
        </div>
      </div>

      <div style={{ display: 'flex', padding: '12px 16px', justifyContent: 'space-between', width: '100%' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, marginRight: 'auto' }}>Report List</span>
        <img src={navIcon} alt="go to provement-list" style={{ width: '20px', transform: 'rotate(180deg)' }} />
      </div>

      <div
        style={{
          display: 'flex',
          padding: '12px 16px',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '28px',
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: 700, marginRight: 'auto' }}>Provement List</span>
        <img src={navIcon} alt="go to provement-list" style={{ width: '20px', transform: 'rotate(180deg)' }} />
      </div>
      <BottomNavigator />
      <YellowBottomNavigator
        style={{ box: { backgroundColor: 'black', paddingTop: 0 }, bar: { backgroundColor: 'white' } }}
      />
    </div>
  );
};

export default Profile;
