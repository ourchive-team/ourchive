import React from 'react';
import styled from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import heartIcon from '../../icons/heart.svg';
import { baseColor } from '../../styles';
import profileIcon from '../../images/profile-icon.png';

export const ItemCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 16px;
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
  favorite?: boolean;
  skeletonCount?: number;
  skeletonWidth?: number;
  skeletonHeight?: number;
  style?: any;
}

interface IRenderSkeleton {
  skeletonWidth?: number;
  skeletonHeight?: number;
}

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
  favorite,
  skeletonCount,
  skeletonWidth,
  skeletonHeight,
  style,
}: IRenderImageList) => {
  const skeletonCountMap = Array.apply(null, new Array(skeletonCount));
  const nav = useNavigate();
  console.log(style);
  return (
    <>
      {itemList.length > 0
        ? itemList.map(el => {
            const navUrl = routeUrlWithoutId ? routeUrl : `${routeUrl}/${el.creator}/${el.creatorNickname}/${el.name}`;
            return (
              <ItemCardDescription onClick={() => nav(navUrl)} style={{ ...style?.wrapper }}>
                {/*<img src="/public/images/image13.png" alt="test-img" />*/}

                {routeUrl ? (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      minWidth: '136px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    {favorite && (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          // backgroundColor: 'rgba(0,0,0,0.1)',
                        }}
                      >
                        <img
                          alt="favorite"
                          src={heartIcon}
                          style={{
                            position: 'absolute',
                            right: 0,
                            marginTop: '10px',
                            marginRight: '10px',
                          }}
                        />
                      </div>
                    )}
                    <img
                      src={el.uri}
                      alt={el.name}
                      style={{ width: skeletonWidth || 'fit-content', maxWidth: '136px' }}
                    />
                  </div>
                ) : (
                  <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
                    <Skeleton width={skeletonWidth || 136} height={skeletonHeight || 143} />
                  </SkeletonTheme>
                )}
                {!hideDetails && typeof el === 'object' && (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      marginTop: 'auto',
                      paddingTop: '10px',
                      flexDirection: 'column',
                    }}
                  >
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
                )}
              </ItemCardDescription>
            );
          })
        : skeletonCountMap.map(el => {
            return (
              <ItemCardDescription>
                <RenderSkeleton skeletonWidth={skeletonWidth || 134} skeletonHeight={skeletonHeight || 143} />
              </ItemCardDescription>
            );
          })}
    </>
  );
};

export default RenderImageList;
