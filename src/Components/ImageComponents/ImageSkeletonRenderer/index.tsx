import React from 'react';
import styled from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { baseColor } from '../../../styles';
import profileIcon from '../../../images/profile-icon.png';
import RenderSkeleton from '../RenderSkeleton';
import ImageContainer from '../ImageContainer';

export interface TokenItem {
  creator: string;
  creatorNickname: string;
  collection: string;
  name: string;
  uri: string;
  price: number;
}

export interface IImageSkeletonRenderer {
  itemList: TokenItem[];
  routeUrl: string;
  routeUrlWithoutId?: boolean;
  hideDetails?: boolean;
  favorite?: boolean;
  skeletonCount?: number;
  skeletonWidth?: number;
  skeletonHeight?: number;
  style?: any;
}

const ImageSkeletonRenderer = ({
  itemList,
  routeUrl,
  routeUrlWithoutId,
  hideDetails,
  favorite,
  skeletonCount,
  skeletonWidth,
  skeletonHeight,
  style,
}: IImageSkeletonRenderer) => {
  const skeletonCountMap = Array.apply(null, new Array(skeletonCount));
  const nav = useNavigate();
  return (
    <>
      {itemList.length > 0
        ? itemList.map(el => {
            const navUrl = routeUrlWithoutId ? routeUrl : `${routeUrl}/${el.creator}/${el.creatorNickname}/${el.name}`;
            return (
              <ItemCardDescriptionContainer onClick={() => nav(navUrl)} style={{ ...style?.wrapper }}>
                {routeUrl ? (
                  <ImageContainer
                    uri={el.uri}
                    alt={el.name}
                    favorite={favorite}
                    style={{ width: skeletonWidth || 'fit-content', maxWidth: '136px' }}
                  />
                ) : (
                  <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
                    <Skeleton width={skeletonWidth || 136} height={skeletonHeight || 143} />
                  </SkeletonTheme>
                )}
                {!hideDetails && typeof el === 'object' && (
                  <ItemDetails name={el.name} price={el.price} creatorNickname={el.creatorNickname} />
                )}
              </ItemCardDescriptionContainer>
            );
          })
        : skeletonCountMap.map(() => {
            return (
              <ItemCardDescriptionContainer>
                <RenderSkeleton skeletonWidth={skeletonWidth || 134} skeletonHeight={skeletonHeight || 143} />
              </ItemCardDescriptionContainer>
            );
          })}
    </>
  );
};

const ItemDetails = ({ name, price, creatorNickname }: { creatorNickname: string; name: string; price: number }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        marginTop: 'auto',
        paddingTop: '10px',
        flexDirection: 'column',
      }}
    >
      <span style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>{name}</span>
      <span style={{ fontSize: '12px', color: baseColor.yellow, marginBottom: '8px' }}>{`${price} ETH ~`}</span>
      <div style={{ display: 'flex', width: '100%' }}>
        <img srcSet={profileIcon} alt="profile icon" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
        <span>{`Creator ${creatorNickname}`}</span>
      </div>
    </div>
  );
};

export const ItemCardDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 16px;
  cursor: pointer;
`;

export default ImageSkeletonRenderer;
