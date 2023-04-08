import React from 'react';
import styled from 'styled-components';
import { baseColor } from '../../styles';

interface ICreator {
  readonly color?: string;
}

interface ICreatedInfo {
  profileImg: any;
  creator: string | undefined;
  style?: {
    img?: any;
    text?: any;
  };
}

const CreatorInfo = ({ profileImg, creator, style }: ICreatedInfo) => {
  return (
    <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center', ...style?.text }}>
      <img srcSet={profileImg} alt="profile icon" style={{ width: '24px', marginRight: '8px', ...style?.img }} />
      <span>Created by &nbsp;</span>
      <Creator color={style?.text?.color}>{`${creator}`}</Creator>
    </div>
  );
};

const Creator = styled.span<ICreator>`
  color: ${props => (props.color ? props.color : baseColor.yellow)};
`;

export default CreatorInfo;
