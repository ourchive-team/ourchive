import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import prevIcon from '../../../icons/prev.svg';

interface ITopNavigator {
  children?: JSX.Element;
}

const TopNavigator = ({ children }: ITopNavigator) => {
  const nav = useNavigate();
  return (
    <TopNavContainer>
      <img
        alt="navigate prev page icon"
        src={prevIcon}
        onClick={() => nav(-1)}
        style={{ position: 'absolute', left: '16px', width: '22px' }}
      />
      <div style={{ fontSize: '18px' }}>{children}</div>
    </TopNavContainer>
  );
};

const TopNavContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default TopNavigator;
