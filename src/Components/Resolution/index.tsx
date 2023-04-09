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
        const border = {
          border: selectedSize === el.size ? `1px solid ${baseColor.yellow}` : '1px solid rgba(255, 255, 255, 0.2)',
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
              color: selectedSize === el.size ? baseColor.yellow : 'white',
            }}
          >
            <DetailBox style={border}>{el.size}</DetailBox>

            <DetailBox style={{ ...border, display: 'flex' }}>
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
            <DetailBox style={border}>{`${el.value} ETH`}</DetailBox>
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
  color: inherit;
`;

export default Resolution;
