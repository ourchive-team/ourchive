import React from 'react';
import styled from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { TokenTypes } from 'aptos';
import { baseColor } from '../../styles';
import profileIcon from '../../images/profile-icon.png';

export const ItemCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: fit-content;
  cursor: pointer;
`;

export interface TokenItem {
  creator: string;
  creatorNickname: string;
  collection: string;
  name: string;
  uri: string;
  price: number;
}

export interface IRenderImageList {
  itemList: TokenItem[];
  routeUrl: string;
  routeUrlWithoutId?: boolean;
  hideDetails?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  style?: any;
}

interface IRenderSkeleton {
  skeletonWidth?: number;
  skeletonHeight?: number;
}

const skeletonItemList: any[] = ['1', '2', '3', '4'];

const RenderSkeleton = ({ skeletonWidth, skeletonHeight }: IRenderSkeleton) => {
  return (
    <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
      <Skeleton width={skeletonWidth || 136} height={skeletonHeight || 143} />
    </SkeletonTheme>
  );
};

const RenderImageList = ({
  itemList,
  routeUrl,
  routeUrlWithoutId,
  hideDetails,
  skeletonWidth,
  skeletonHeight,
  style,
}: IRenderImageList) => {
  const nav = useNavigate();
  return (
    <>
      {itemList.length > 0
        ? itemList.map(el => {
            const navUrl = routeUrlWithoutId ? routeUrl : `${routeUrl}/${el.creator}/${el.creatorNickname}/${el.name}`;
            return (
              <ItemCardDescription onClick={() => nav(navUrl)} style={{ ...style?.wrapper }}>
                {/*<img src="/public/images/image13.png" alt="test-img" />*/}
                {routeUrl ? (
                  <img
                    src={el.uri}
                    alt={el.name}
                    style={{ width: skeletonWidth || 136, height: skeletonHeight || 143 }}
                  />
                ) : (
                  <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
                    <Skeleton width={skeletonWidth || 136} height={skeletonHeight || 143} />
                  </SkeletonTheme>
                )}
                {!hideDetails && typeof el === 'object' && (
                  <>
                    <div style={{ display: 'flex', width: '100%', marginTop: '10px', flexDirection: 'column' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>{el.name}</span>
                      <span style={{ fontSize: '12px', color: baseColor.yellow, marginBottom: '8px' }}>
                        {`${el.price} APT ~`}
                      </span>
                      <div style={{ display: 'flex', width: '100%' }}>
                        <img
                          srcSet={profileIcon}
                          alt="profile icon"
                          style={{ width: '16px', height: '16px', marginRight: '4px' }}
                        />
                        <span>{`Creator ${el.creatorNickname}`}</span>
                      </div>
                    </div>
                  </>
                )}
              </ItemCardDescription>
            );
          })
        : skeletonItemList.map(el => {
            return (
              <ItemCardDescription>
                <RenderSkeleton skeletonWidth={skeletonWidth} skeletonHeight={skeletonHeight} />
              </ItemCardDescription>
            );
          })}
    </>
  );
};

export default RenderImageList;
