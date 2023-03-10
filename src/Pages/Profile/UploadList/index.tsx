import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import RenderImageList, { TokenItem } from '../../../Components/RenderImageList';

import aptosLogo from '../../../icons/aptos.svg';
import { baseColor, PaddingBox, StyledSpan } from '../../../styles';
import YellowBottomNavigator from '../../../Components/YellowBottomNavigator';
import TopNavigator from '../../../Components/TopNavigator';
import { getUploadedImageList } from '../../../func';
import { addressState, nicknameState, publicKeyState } from '../../../states/loginState';

interface ItemList {
  id: string;
  title: string;
  desc: string;
  profit: string;
}

const UploadList = () => {
  const [address] = useRecoilState(addressState);
  const addressString = address;

  const [uploadList, setUploadList] = useState<TokenItem[]>([]);

  useEffect(() => {
    getUploadedImageList(addressString).then(data => {
      setUploadList(data);
    });
  }, []);

  const nav = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopNavigator>
        <span>Upload List</span>
      </TopNavigator>
      <PaddingBox>
        {uploadList.map(el => {
          return (
            <div
              onClick={() => nav(`/images/${el.creator}/${el.creatorNickname}/${el.name}`)}
              style={{
                display: 'flex',
                marginBottom: '20px',
                border: '1px solid white',
                borderRadius: '16px',
                height: 'fit-content',
              }}
            >
              <RenderImageList itemList={[el]} routeUrl="/Images" skeletonWidth={100} skeletonHeight={100} hideDetails />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px 16px 16px 0px',
                  height: '140px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <StyledSpan style={{ fontWeight: 700, fontSize: '15px', whiteSpace: 'nowrap' }}>{el.name}</StyledSpan>
                <StyledSpan
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    width: '100%',
                    margin: '8px 0px',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  description todo
                </StyledSpan>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginRight: '8px' }}>
                    My profit
                  </span>
                  <span style={{ fontWeight: 700, color: baseColor.yellow }}>{1234}</span>
                  <img
                    src={aptosLogo}
                    alt="apt_logo"
                    style={{ borderRadius: '50%', marginLeft: '4px', width: '16px', height: '16px' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </PaddingBox>
      <YellowBottomNavigator
        style={{
          box: { position: 'fixed', left: 0, bottom: 0, backgroundColor: 'black', zIndex: 2, paddingTop: '0px' },
          bar: { backgroundColor: 'white' },
        }}
      />
    </div>
  );
};

export default UploadList;
