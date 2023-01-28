import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { LargeButton, StyledInput } from '../../styles';
import { uploadNFT } from '../../func';

const StyledBox = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #4e4e4b;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  background-color: transparent;
  color: gray;
  border-color: #4e4e4b;
  padding: 16px;
  border-radius: 8px;
  min-height: 48px;
  font-size: 14px;

  ::placeholder {
    color: #4e4e4b;
  }
`;

interface IRenderTextArea {
  title: string;
  textAreaStyle?: object;
}

const RenderTextArea = ({ title, textAreaStyle }: IRenderTextArea) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
      <span style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{title}</span>
      <TextArea style={textAreaStyle} placeholder={`write ${title}...`.toLowerCase()} name={title} />
    </div>
  );
};

const Upload = () => {
  const { handleSubmit } = useForm();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      <StyledBox
        style={{
          width: '160px',
          aspectRatio: '1/1',
          marginBottom: '40px',
        }}
        // onClick with UploadNFT Images
      >
        +
      </StyledBox>
      <form style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <RenderTextArea title="NFT Title" />
        <RenderTextArea title="Description" textAreaStyle={{ height: '140px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <span style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Price</span>
          <StyledInput type="text" placeholder="write price..." />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <span style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Product Quantity</span>
          <StyledInput type="text" placeholder="write product quantity..." />
        </div>

        <LargeButton
          type="submit"
          style={{ textTransform: 'capitalize', marginTop: 'auto' }}
          onClick={() => uploadNFT()}
        >
          Upload
        </LargeButton>
      </form>
    </div>
  );
};

export default Upload;
