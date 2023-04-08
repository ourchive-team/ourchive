import React from 'react';
import styled from 'styled-components';

import { baseColor } from '../../../styles';

interface IYellowBottomNavigator {
  children?: JSX.Element;
  style?: {
    box?: any;
    bar?: any;
  };
  fixed?: boolean;
}

const YellowBottomNavigator = ({ children, style, fixed }: IYellowBottomNavigator) => {
  return (
    <YellowBottomNavContainer style={style?.box}>
      {children}
      <YellowBottomNavBar style={style?.bar} />
    </YellowBottomNavContainer>
  );
};

const YellowBottomNavContainer = styled.div`
  display: flex;
  margin-top: auto;
  position: sticky;
  height: fit-content;
  padding: 16px 16px 0px;
  width: 100%;
  bottom: 0;
  z-index: 9;
  flex-direction: column;
  background-color: ${baseColor.yellow};
`;

const YellowBottomNavBar = styled.div`
  width: 134px;
  height: 5px;
  margin: 21px auto 8px;
  background-color: black;
  border-radius: 100px;
`;

export default YellowBottomNavigator;
