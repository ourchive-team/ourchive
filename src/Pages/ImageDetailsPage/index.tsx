import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
// @ts-ignore
import s1 from '../../images/s1.jpg';
// @ts-ignore

import s2 from '../../images/s2.jpg';
// @ts-ignore

import s3 from '../../images/s3.jpg';
// @ts-ignore

import s4 from '../../images/s4.jpg';
// @ts-ignore

import s5 from '../../images/s5.jpg';
// @ts-ignore

import o1 from '../../images/o1.jpg';
// @ts-ignore

import o2 from '../../images/o2.jpg';
// @ts-ignore

import o3 from '../../images/o3.jpg';
// @ts-ignore

import o4 from '../../images/o4.jpg';
// @ts-ignore

import o5 from '../../images/o5.jpg';

import flagIcon from '../../icons/flag.svg';
import profileIcon from '../../images/profile-icon.png';
import { baseColor, ImageContainer, LargeButton, PaddingBox } from '../../styles';
import FeedStatusBar from '../../Components/FeedStatusBar';
import Resolution from '../../Components/Resolution';
import ImageSkeletonRenderer, { TokenItem } from '../../Components/ImageComponents/ImageSkeletonRenderer';
import TopNavigator from '../../Components/NavigatorComponents/TopNavigator';
import BottomContainer from '../../Components/NavigatorComponents/BottomContainer';
import { onchain } from '../../func';
import { ImageInfo } from '../../func/type';
import CreatorInfo from '../../Components/CreatorInfo';

const ImageDetailsPage = () => {
  const nav = useNavigate();
  const nftAddress = window.location.pathname.replace('/images/', '');

  const pathItems = window.location.pathname.split('/');
  const creatorAddress = pathItems[2].replace(/%20/g, ' ');
  const nickname = pathItems[3].replace(/%20/g, ' ');
  const imageTitle = pathItems[4].replace(/%20/g, ' ');
  const [imageInfo, setImageInfo] = useState<ImageInfo>();

  const [otherWorks, setOtherWorks] = useState<TokenItem[]>([]);
  const [similarWorks, setSimilarWorks] = useState<TokenItem[]>([]);

  useEffect(() => {
    onchain.getImageInfo(creatorAddress, nickname, imageTitle).then(info => {
      setImageInfo(info);
      setTimeout(() => {
        setOtherWorks([
          {
            creator: '0x7cdcb7db6176fadcdc75ddaa94cc4b5b9246d81956b9b0b01ab3d503e646752c',
            creatorNickname: '',
            collection: "'s Collection",
            name: 'mildpanic',
            uri: s1,
            price: 1,
          },
          {
            creator: '0x7cdcb7db6176fadcdc75ddaa94cc4b5b9246d81956b9b0b01ab3d503e646752c',
            creatorNickname: '',
            collection: "'s Collection",
            name: 'testing',
            uri: s2,
            price: 1,
          },
          {
            creator: '0x9d2fbc2ade41ba9f720d911e34980768fa555ed77e87e779b1f34fc708543a7e',
            creatorNickname: 'Michael2',
            collection: "Michael2's Collection",
            name: '1234',
            uri: s3,
            price: 1,
          },
          {
            creator: '0x225d39dbec63f34bdafdad218a7c79d0d2d9eac46ca43783668ec4c47fbe1e4c',
            creatorNickname: 'Michael3',
            collection: "Michael3's Collection",
            name: 'testinggg',
            uri: s4,
            price: 1,
          },
          {
            creator: '0xb1ee0eee34e231fd0236b59a6e96f6027a5576bd65417e59edabd233729470c5',
            creatorNickname: 'da guzus',
            collection: "da guzus's Collection",
            name: 'a',
            uri: s5,
            price: 1,
          },
        ]);
        setSimilarWorks([
          {
            creator: '0x7cdcb7db6176fadcdc75ddaa94cc4b5b9246d81956b9b0b01ab3d503e646752c',
            creatorNickname: '',
            collection: "'s Collection",
            name: 'mildpanic',
            uri: o1,
            price: 1,
          },
          {
            creator: '0x7cdcb7db6176fadcdc75ddaa94cc4b5b9246d81956b9b0b01ab3d503e646752c',
            creatorNickname: '',
            collection: "'s Collection",
            name: 'testing',
            uri: o2,
            price: 1,
          },
          {
            creator: '0x9d2fbc2ade41ba9f720d911e34980768fa555ed77e87e779b1f34fc708543a7e',
            creatorNickname: 'Michael2',
            collection: "Michael2's Collection",
            name: '1234',
            uri: o3,
            price: 1,
          },
          {
            creator: '0x225d39dbec63f34bdafdad218a7c79d0d2d9eac46ca43783668ec4c47fbe1e4c',
            creatorNickname: 'Michael3',
            collection: "Michael3's Collection",
            name: 'testinggg',
            uri: o4,
            price: 1,
          },
          {
            creator: '0xb1ee0eee34e231fd0236b59a6e96f6027a5576bd65417e59edabd233729470c5',
            creatorNickname: 'da guzus',
            collection: "da guzus's Collection",
            name: 'a',
            uri: o5,
            price: 1,
          },
        ]);
      }, 2000);
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
      <PaddingBox style={{ paddingTop: '48px' }}>
        <ImageContainer style={{ minHeight: '300px', height: '300px' }}>
          <img style={{ width: 'fit-content', maxWidth: '100%' }} src={imageInfo?.imgUrl} alt={imageInfo?.title} />
        </ImageContainer>
      </PaddingBox>
      <PaddingBox style={{ padding: '0px 16px' }}>
        <span style={{ fontSize: '24px', fontWeight: 700, marginTop: '16px' }}>{imageInfo?.title}</span>
        <span style={{ fontSize: '13px', opacity: 0.7, margin: '8px 0px' }}>{imageInfo?.description}</span>
        <CreatorInfo profileImg={profileIcon} creator={imageInfo?.creatorNickname} />
      </PaddingBox>
      <PaddingBox>
        <FeedStatusBar />
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
          <ImageSkeletonRenderer
            itemList={otherWorks}
            routeUrl="/images"
            skeletonCount={6}
            skeletonWidth={140}
            skeletonHeight={140}
            style={{ wrapper: { padding: '16px' } }}
            hideDetails
          />
        </div>
      </div>
      <PaddingBox>
        <span style={{ fontWeight: 700, fontSize: '14px' }}>Similar works</span>
      </PaddingBox>
      <div style={{ width: '100%', height: '100%', marginBottom: '32px' }}>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0px 16px' }}>
          <ImageSkeletonRenderer
            itemList={similarWorks}
            routeUrl="/images"
            skeletonCount={6}
            skeletonWidth={140}
            skeletonHeight={140}
            style={{ wrapper: { padding: '16px' } }}
            hideDetails
          />
        </div>
      </div>
      {/*/!* nav = /reportNFT -> /reportNFT:id *!/*/}
      {/* nav = /buyNFT -> /buyNFT:id */}
      <BottomContainer style={{ backgroundColor: baseColor.beige }}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <LargeButton
            onClick={() => nav('report')}
            style={{
              width: '48px',
              background: 'white',
              border: '1px solid black',
              color: 'black',
              marginRight: '8px',
              borderRadius: '8px',
            }}
          >
            <img src={flagIcon} alt="report" style={{ width: '15px' }} />
          </LargeButton>
          <LargeButton onClick={() => nav('purchase')}>Buy this Image</LargeButton>
        </div>
      </BottomContainer>
    </div>
  );
};

export default ImageDetailsPage;
