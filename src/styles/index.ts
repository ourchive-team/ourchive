import styled from 'styled-components';

export const baseColor = {
  purple: '#DAC6FB',
  green: '#029C54',
  yellow: '#FBFE67',
  blue: '#BEE6EE',
  orange: '#F55B1D',
  pink: '#FEB2CE',
};

export const PaddingBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const LargeButton = styled.button`
  width: 100%;
  height: 48px;
  font-size: 16px;

  min-height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  cursor: pointer;

  /* Black */
  background: black;
  border: none;
  border-radius: 4px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  width: 100%;

  border-radius: 4px;

  background-color: #f2f2f2;
`;

export const StyledInput = styled.input`
  background-color: transparent;
  color: gray;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 16px;
  border-radius: 12px;
  min-height: 48px;
  font-size: 14px;
  color: white;

  ::placeholder {
    color: #4e4e4b;
  }
`;
