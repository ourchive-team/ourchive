import React from 'react';
import styled from 'styled-components';

const ItemCardDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: fit-content;
`;

interface IGridImageContainer {
  itemList: string[] | { [x: string]: string }[];
}

const GridImageContainer = ({ itemList }: IGridImageContainer) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, auto))',
        background: '#F2F2F2',
      }}
    >
      {itemList.map(el => {
        return (
          <ItemCardDescription onClick={() => {}}>
            <img src="/public/images/image13.png" alt="test-img" />
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
