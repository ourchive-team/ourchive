import React from 'react';
import styled from 'styled-components';
import heartIcon from '../../../icons/heart.svg';

interface IImageContainer {
  uri: string;
  alt: string;
  favorite?: boolean;
  style?: any;
}

const ImageContainer = ({ uri, alt, favorite, style }: IImageContainer) => {
  return (
    <ImageContainerBox>
      {favorite && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundImage: 'linear-gradient(to bottom, rgba(75, 75, 75, 1) 0%, rgba(0, 0, 0, 0) 30%)',
          }}
        >
          <img
            alt="favorite"
            src={heartIcon}
            style={{
              position: 'absolute',
              right: 0,
              marginTop: '10px',
              marginRight: '10px',
            }}
          />
        </div>
      )}
      <img src={uri} alt={alt} style={style} />
    </ImageContainerBox>
  );
};

export default ImageContainer;

export const ImageContainerBox = styled.div`
  display: flex;
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  height: 100%;
  min-width: 136px;
  justify-content: center;
  align-items: center;
  position: relative;
`;
