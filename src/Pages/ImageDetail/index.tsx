import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import flagIcon from '../../icons/flag.svg';
import profileIcon from '../../images/profile-icon.png';
import { ImageContainer, LargeButton, PaddingBox } from '../../styles';
import FeedStatus from '../../Components/FeedStatus';
import Resolution from '../../Components/Resolution';
import RenderImageList, { TokenItem } from '../../Components/RenderImageList';
import TopNavigator from '../../Components/TopNavigator';
import YellowBottomNavigator from '../../Components/YellowBottomNavigator';
import { getImageInfo, ImageInfo } from '../../func';
import CreatedBy from '../../Components/CreatedBy';

const ImageDetail = () => {
  const nav = useNavigate();
  const nftAddress = window.location.pathname.replace('/images/', '');

  const pathItems = window.location.pathname.split('/');
  const creatorAddress = pathItems[2].replace(/%20/g, ' ');
  const nickname = pathItems[3].replace(/%20/g, ' ');
  const imageTitle = pathItems[4].replace(/%20/g, ' ');
  const [imageInfo, setImageInfo] = useState<ImageInfo>();

  useEffect(() => {
    getImageInfo(creatorAddress, nickname, imageTitle).then(info => {
      setImageInfo(info);
      console.log('item:', info);
    });
  }, []);

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
        <ImageContainer style={{ minHeight: '300px', height: '300px' }}>
          <img style={{ width: 'fit-content', maxWidth: '100%' }} src={imageInfo?.imgUrl} alt={imageInfo?.title} />
        </ImageContainer>
      </PaddingBox>
      <PaddingBox style={{ padding: '0px 16px' }}>
        <span style={{ fontSize: '24px', fontWeight: 700, marginTop: '16px' }}>{imageInfo?.title}</span>
        <span style={{ fontSize: '13px', opacity: 0.7, margin: '8px 0px' }}>{imageInfo?.description}</span>
        <CreatedBy profileImg={profileIcon} creator={imageInfo?.creatorNickname} />
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
            itemList={[]}
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
            itemList={[]}
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
          <LargeButton onClick={() => nav('purchase')}>Buy this Image</LargeButton>
        </div>
      </YellowBottomNavigator>
    </div>
  );
};

export default ImageDetail;
