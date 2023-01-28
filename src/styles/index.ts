import styled from 'styled-components';

export const baseColor = {
  purple: '#DAC6FB',
  green: '#029C54',
  yellow: '#F3F956',
  blue: '#BEE6EE',
  orange: '#F55B1D',
  pink: '#FEB2CE',
};

export const LargeButton = styled.button`
  width: 100%;
  height: 48px;
  min-height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  color: white;

  /* Black */
  background: #1a1a1a;
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
  border: 1px solid #4e4e4b;
  padding: 16px;
  border-radius: 8px;
  min-height: 48px;
  font-size: 14px;

  ::placeholder {
    color: #4e4e4b;
  }
`;
