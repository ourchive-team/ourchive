import styled from 'styled-components';

export const baseColor = {
  purple: '#DAC6FB',
  green: '#5E8D41',
  yellow: '#FBFE67',
  darkYellow: '#CC8E26',
  blue: '#BEE6EE',
  lightOrange: '#CC8E26',
  orange: '#F55B1D',
  pink: '#D57368',
  beige: '#E7CFB6',
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

  font-weight: 700;

  min-height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  cursor: pointer;

  white-space: nowrap;

  /* Black */
  background: black;
  border: none;
  border-radius: 36px;

  :disabled {
    background-color: #8e8e8e;
  }
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
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 16px;
  border-radius: 12px;
  min-height: 48px;
  font-size: 14px;
  color: black;

  ::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
`;

export const StyledSpan = styled.span`
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
`;
