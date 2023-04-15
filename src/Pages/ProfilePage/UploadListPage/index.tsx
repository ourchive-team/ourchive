import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { TokenItem } from '../../../Components/ImageComponents/ImageSkeletonRenderer';

import { baseColor, PaddingBox, StyledSpan } from '../../../styles';
import BottomContainer from '../../../Components/NavigatorComponents/BottomContainer';
import TopNavigator from '../../../Components/NavigatorComponents/TopNavigator';
import { addressState, uploadedImageList } from '../../../states/loginState';
import ImageContainer from '../../../Components/ImageComponents/ImageContainer';
import { onchain } from '../../../func';

interface ItemList {
  id: string;
  title: string;
  desc: string;
  profit: string;
}

const UploadListPage = () => {
  const [address, setAddress] = useRecoilState(addressState);
  const [uploadedImage, setUploadedImage] = useRecoilState(uploadedImageList);

  const addressString = address;

  useEffect(() => {
    onchain.getUploadedImageList(addressString).then(data => {
      setUploadedImage(data);
    });
  }, []);

  const nav = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopNavigator>
        <span>Upload List</span>
      </TopNavigator>
      <PaddingBox>
        {uploadedImage.map(el => {
          return (
            <div
              onClick={() => nav(`/images/${el.creator}/${el.creatorNickname}/${el.name}`)}
              style={{
                display: 'flex',
                marginBottom: '20px',
                border: '1px solid black',
                borderRadius: '16px',
                height: 'fit-content',
              }}
            >
              <ImageContainer uri={el.uri} alt={el.name} style={{ width: 'fit-content', maxWidth: '136px' }} />
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
                    color: 'rgba(0,0,0,0.6)',
                  }}
                >
                  description todo
                </StyledSpan>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.4)', marginRight: '8px' }}>My profit</span>
                  <span style={{ fontWeight: 700, color: '#D57368' }}>1234</span>
                </div>
              </div>
            </div>
          );
        })}
      </PaddingBox>
      <BottomContainer
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          backgroundColor: baseColor.beige,
          zIndex: 2,
          paddingTop: '0px',
        }}
      />
    </div>
  );
};

export default UploadListPage;
