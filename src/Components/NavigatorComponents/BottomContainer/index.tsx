import React from 'react';
import styled from 'styled-components';

interface IBottomContainer {
  children?: JSX.Element;
  style?: any;
  fixed?: boolean;
}

const BottomContainer = ({ children, style, fixed }: IBottomContainer) => {
  return (
    <BottomNavContainer style={style}>
      {children}
      <BottomNavBar />
    </BottomNavContainer>
  );
};

const BottomNavContainer = styled.div`
  display: flex;
  margin-top: auto;
  position: sticky;
  height: fit-content;
  padding: 16px 16px 0px;
  width: 100%;
  bottom: 0;
  z-index: 9;
  flex-direction: column;
`;

const BottomNavBar = styled.div`
  width: 134px;
  height: 5px;
  margin: 21px auto 8px;
  background-color: black;
  border-radius: 100px;
  bottom: 0;
`;

export default BottomContainer;
