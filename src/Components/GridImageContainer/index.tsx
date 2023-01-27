import React from 'react';
import styled from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const ItemCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: fit-content;
  cursor: pointer;
`;

interface IGridImageContainer {
  itemList: { [x: string]: string }[];
  routeUrl: string;
}

const GridImageContainer = ({ itemList, routeUrl }: IGridImageContainer) => {
  const nav = useNavigate();
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, auto))',
      }}
    >
      {itemList.map(el => {
        return (
          <ItemCardDescription onClick={() => nav(`${routeUrl}/${el.id}`)}>
            {/*<img src="/public/images/image13.png" alt="test-img" />*/}
            <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
              <Skeleton width={136} height={143} />
            </SkeletonTheme>
            {typeof el === 'object' &&
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
    </div>
  );
};

export default GridImageContainer;
