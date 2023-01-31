import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import flagIcon from '../../icons/flag.svg';
import profileIcon from '../../images/profile-icon.png';
import { baseColor, ImageContainer, LargeButton, PaddingBox } from '../../styles';
import FeedStatus from '../../Components/FeedStatus';
import Resolution from '../../Components/Resolution';
import RenderImageList from '../../Components/RenderImageList';
import TopNavigator from '../../Components/TopNavigator';
import YellowBottomNavigator from '../../Components/YellowBottomNavigator';
import { getImageInfo } from '../../func';

const ImageDetail = () => {
  const nav = useNavigate();
  const nftAddress = window.location.pathname.replace('/images/', '');

  const creatorAddress = '0x2e35131572a43a1d82b4678857cb6fa44722367483250dfd7d87a25c1deeaf04';
  const imageTitle = '';
  const imageInfo = getImageInfo(creatorAddress, imageTitle);

  const realImageData = {
    icon: '???',
    creator: '',
  };

  const imageData = {
    icon: 'Icon',
    creator: 'SH.Kim',
    title: 'A Colorful artwork',
    desc: 'A photo collection of my fashion philosophy. Follow me while Paris Fashion Week 🧤',
  };

  const imageDataMap = Object.values(imageData);
  const imageDataMapWithoutProfileData = imageDataMap.slice(2, imageDataMap.length);

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

  const resolutionList = [
    {
      size: 'LARGE',
      resolution: '4000x2500',
      dpi: '300',
      format: 'jpg',
      value: 1,
    },
    {
      size: 'MEDIUM',
      resolution: '4000x2500',
      dpi: '300',
      format: 'jpg',
      value: 1,
    },
    {
      size: 'SMALL',
      resolution: '4000x2500',
      dpi: '300',
      format: 'jpg',
      value: 1,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      <TopNavigator>
        <span>Purchase</span>
      </TopNavigator>

      <PaddingBox>
        <ImageContainer style={{ minHeight: '300px', height: '300px' }} />
      </PaddingBox>

      <PaddingBox style={{ padding: '0px 16px' }}>
        <span style={{ fontSize: '24px', fontWeight: 700, marginTop: '16px' }}>{imageData.title}</span>
        <span style={{ fontSize: '13px', opacity: 0.7, margin: '8px 0px' }}>{imageData.desc}</span>
        <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
          <img srcSet={profileIcon} alt="profile icon" style={{ width: '24px', marginRight: '8px' }} />
          <span>Created by &nbsp;</span>
          <span style={{ color: baseColor.yellow }}>{`${imageData.creator}`}</span>
        </div>
      </PaddingBox>

      <PaddingBox>
        <FeedStatus />
      </PaddingBox>

      <PaddingBox style={{ padding: '0px 16px', marginBottom: '-16px' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, marginTop: '24px' }}>Detail</span>
      </PaddingBox>
      <Resolution list={resolutionList} />
      {/* Description Card Box */}

      {/*Recommend*/}
      <PaddingBox>
        <span style={{ fontWeight: 700, fontSize: '14px' }}>Other works by this artist</span>
      </PaddingBox>
      <div style={{ width: '100%', height: '100%', marginBottom: '32px' }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0px 16px' }}>
          <RenderImageList
            itemList={itemList}
            routeUrl="/images"
            skeletonWidth={140}
            skeletonHeight={140}
            style={{ wrapper: { padding: '6px' } }}
            hideDetails
          />
        </div>
      </div>

      <PaddingBox>
        <span style={{ fontWeight: 700, fontSize: '14px' }}>Similar works</span>
      </PaddingBox>
      <div style={{ width: '100%', height: '100%', marginBottom: '32px' }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0px 16px' }}>
          <RenderImageList
            itemList={itemList}
            routeUrl="/images"
            skeletonWidth={140}
            skeletonHeight={140}
            style={{ wrapper: { padding: '6px' } }}
            hideDetails
          />
        </div>
      </div>

      {/*/!* nav = /reportNFT -> /reportNFT:id *!/*/}

      {/* nav = /buyNFT -> /buyNFT:id */}
      <YellowBottomNavigator>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <LargeButton
            onClick={() => nav('report')}
            style={{
              width: '48px',
              background: 'white',
              border: '1px solid black',
              color: 'black',
              marginRight: '4px',
            }}
          >
            <img src={flagIcon} alt="report" style={{ width: '15px' }} />
          </LargeButton>
          <LargeButton onClick={() => nav('purchase')}>Buy this NFT</LargeButton>
        </div>
      </YellowBottomNavigator>
    </div>
  );
};

export default ImageDetail;
