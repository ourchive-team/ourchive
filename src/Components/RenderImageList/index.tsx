import React from 'react';
import styled from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const ItemCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: fit-content;
  cursor: pointer;
`;

export interface IRenderImageList {
  itemList: { [x: string]: string }[];
  routeUrl: string;
  hideDetails?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
}

const RenderImageList = ({ itemList, routeUrl, hideDetails, skeletonWidth, skeletonHeight }: IRenderImageList) => {
  const nav = useNavigate();
  return (
    <>
      {itemList.map(el => {
        return (
          <ItemCardDescription onClick={() => nav(`${routeUrl}/${el.id}`)}>
            {/*<img src="/public/images/image13.png" alt="test-img" />*/}
            <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
              <Skeleton width={skeletonWidth || 136} height={skeletonHeight || 143} />
            </SkeletonTheme>
            {!hideDetails &&
              typeof el === 'object' &&
              Object.values(el).map(value => {
                return (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <span>{value}</span>
                  </div>
                );
              })}
          </ItemCardDescription>
        );
      })}
    </>
  );
};

export default RenderImageList;
