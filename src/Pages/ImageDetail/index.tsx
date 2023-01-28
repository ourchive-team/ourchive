import React from 'react';
import styled from 'styled-components';

import { useLocation, useNavigate } from 'react-router-dom';

import { ImageContainer, LargeButton } from '../../styles';
import GridImageContainer from '../../Components/GridImageContainer';

interface IRenderSeeMoreDetailsLayout {
  itemList: string[];
}

const RenderSeeMoreDetailsLayout = ({ itemList }: IRenderSeeMoreDetailsLayout) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      {itemList.map(el => (
        <span>{el}</span>
      ))}
    </div>
  );
};

const Card = styled.div`
  width: 100%;

  border: 1px solid black;
  border-radius: 8px;

  margin-bottom: 10px;
  padding: 16px;
`;

const ImageDetail = () => {
  const nav = useNavigate();

  const imageData = {
    icon: 'Icon',
    creator: 'SH.Kim',
    title: 'Title',
    desc: 'Description',
  };

  const imageDataMap = Object.values(imageData);
  const imageDataMapWithoutProfileData = imageDataMap.slice(2, imageDataMap.length);

  const recommendedItemList = [{ id: '0x123' }, { id: '0x124' }];
  const similarImageItemList = [{ id: '0x125' }, { id: '0x126' }];

  const location = useLocation();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '16px 24px',
        overflow: 'auto',
      }}
    >
      <div>Header</div>
      <ImageContainer style={{ minHeight: '100px', height: '100px' }} />
      <div style={{ margin: '12px 0px' }}>Feed Status Bar</div>

      {/* Description Card Box */}
      <div style={{ marginBottom: '28px' }}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '6px' }}>{imageData.icon}</div>
              <span>{imageData.creator}</span>
            </div>
            {imageDataMapWithoutProfileData.map(el => (
              <span>{el}</span>
            ))}
          </div>
        </Card>
        <Card>
          <RenderSeeMoreDetailsLayout itemList={['사진 형식', '더보기 >']} />
          <RenderSeeMoreDetailsLayout itemList={['수수료', '더보기 >']} />
        </Card>
      </div>

      {/*Recommend*/}
      <>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '28px' }}>
          <RenderSeeMoreDetailsLayout itemList={['아티스트의 다른 작품', '더보기 >']} />
          <GridImageContainer itemList={recommendedItemList} routeUrl="/images" hideDetails />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '56px' }}>
          <RenderSeeMoreDetailsLayout itemList={['유사한 이미지', '더보기 >']} />
          <GridImageContainer itemList={similarImageItemList} routeUrl="/images" hideDetails />
        </div>
      </>

      {/*footer*/}
      <div style={{ display: 'flex', marginTop: 'auto' }}>
        {/* nav = /reportNFT -> /reportNFT:id */}
        <LargeButton
          onClick={() => nav('reportNFT')}
          style={{ width: '48px', background: 'white', border: '1px solid black', color: 'black', marginRight: '4px' }}
        >
          신고
        </LargeButton>
        {/* nav = /buyNFT -> /buyNFT:id */}
        <LargeButton onClick={() => nav('buyNFT')}>Buy This NFT</LargeButton>
      </div>
    </div>
  );
};

export default ImageDetail;
