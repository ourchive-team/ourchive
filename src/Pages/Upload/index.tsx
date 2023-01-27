import React from 'react';
import styled from 'styled-components';

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

const Input = styled.input`
  background-color: transparent;
  color: gray;
  border: 1px solid #4e4e4b;
  padding: 16px;
  border-radius: 8px;
  min-height: 48px;
  font-size: 14px;
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
      <StyledBox
        style={{
          width: '100px',
          height: '100px',
          marginBottom: '40px',
        }}
        // onClick with Upload Images
      >
        +
      </StyledBox>

      <form style={{ height: '100%' }}>
        <RenderTextArea title="NFT Title" />
        <RenderTextArea title="Description" textAreaStyle={{ height: '72px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <span style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Price</span>
          <Input placeholder="write price..." />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <span style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Product Quantity</span>
          <Input placeholder="write product quantity..." />
        </div>
      </form>
    </div>
  );
};

export default Upload;
