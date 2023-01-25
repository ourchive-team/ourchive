import styled from 'styled-components';
import { media } from './mediaQuery';

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
