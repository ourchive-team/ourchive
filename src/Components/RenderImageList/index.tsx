import React from 'react';
import styled from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { baseColor } from '../../styles';
import profileIcon from '../../images/profile-icon.png';

export const ItemCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: fit-content;
  cursor: pointer;
`;

export interface IRenderImageList {
  itemList: { [x: string]: string | number }[];
  routeUrl: string;
  hideDetails?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  style?: any;
}

const RenderImageList = ({
  itemList,
  routeUrl,
  hideDetails,
  skeletonWidth,
  skeletonHeight,
  style,
}: IRenderImageList) => {
  const nav = useNavigate();
  return (
    <>
      {itemList.map(el => {
        return (
          <ItemCardDescription onClick={() => nav(`${routeUrl}/${el.id}`)} style={{ ...style?.wrapper }}>
            {/*<img src="/public/images/image13.png" alt="test-img" />*/}
            <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
              <Skeleton width={skeletonWidth || 136} height={skeletonHeight || 143} />
            </SkeletonTheme>
            {!hideDetails && typeof el === 'object' && (
              <>
                <div style={{ display: 'flex', width: '100%', marginTop: '10px', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>{el.title}</span>
                  <span style={{ fontSize: '12px', color: baseColor.yellow, marginBottom: '8px' }}>
                    {`${el.price} APT ~`}
                  </span>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <img srcSet={profileIcon} alt="profile icon" style={{ width: '16px', marginRight: '4px' }} />
                    <span>{`Creator ${el.creator}`}</span>
                  </div>
                </div>
              </>
            )}
          </ItemCardDescription>
        );
      })}
    </>
  );
};

export default RenderImageList;
