import React, { useState } from 'react';
import styled from 'styled-components';
import { baseColor } from '../../styles';

export interface IResolutionList {
  size: string;
  resolution: string;
  dpi: string;
  format: string;
  value: number;
}

interface IResolution {
  list: IResolutionList[];
  selectedSize?: string;
  selector?: (size: IResolutionList) => void;
}
const Resolution = ({ list, selectedSize, selector }: IResolution) => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '16px 0px' }}>
      {list.map(el => {
        const style = {
          border: selectedSize === el.size ? `1px solid ${baseColor.green}` : '1px solid rgba(44, 44, 44, 0.2)',
          color: selectedSize === el.size ? baseColor.green : 'black',
        };
        return (
          <Button
            type="button"
            onClick={e => selector && selector(el)}
            style={{
              display: 'flex',
              width: '100%',
              cursor: 'pointer',
              overflowX: 'auto',
              padding: '12px 16px',
              color: selectedSize === el.size ? baseColor.green : 'white',
            }}
          >
            <DetailBox style={{ fontWeight: 700, ...style }}>{el.size}</DetailBox>

            <DetailBox style={{ ...style, display: 'flex' }}>
              <span>
                {`${el.resolution} px ·`}
                &nbsp;
              </span>
              <span>
                {`DPI ${el.dpi} ·`}
                &nbsp;
              </span>
              <span>{el.format}</span>
            </DetailBox>
            <DetailBox style={style}>{`${el.value} ETH`}</DetailBox>
          </Button>
        );
      })}
    </div>
  );
};

const Button = styled.button`
  background-color: transparent;
  border: none;
`;

const DetailBox = styled.div`
  white-space: nowrap;
  background-color: transparent;
  margin-right: 4px;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 8px;
  color: black;
`;

export default Resolution;
