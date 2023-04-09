import { useRecoilState } from 'recoil';

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Link, { useNavigate } from 'react-router-dom';

import plusIcon from '../../icons/plus.svg';

import { baseColor, LargeButton, PaddingBox, StyledInput } from '../../styles';
import { onchain } from '../../func';
import YellowBottomNavigator from '../../Components/NavigatorComponents/YellowBottomNavigator';
import TopNavigator from '../../Components/NavigatorComponents/TopNavigator';
import Modal from '../../Components/Modal';
import { nicknameState } from '../../states/loginState';

interface IRenderTextArea {
  title: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  textAreaStyle?: object;
}

const RenderTextArea = ({ title, name, value, onChange, textAreaStyle }: IRenderTextArea) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
      <span style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{title}</span>
      <TextArea
        title={title}
        name={name}
        value={value}
        onChange={onChange}
        style={textAreaStyle}
        placeholder={`write ${title}...`.toLowerCase()}
      />
    </div>
  );
};

const UploadPage = () => {
  const [inputValues, setInputValues] = useState({ title: '', desc: '', price: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const nav = useNavigate();
  const [nickname, setUserNickname] = useRecoilState(nicknameState);
  if ((nickname as unknown as string) === '') {
    const { address } = window.aptos.account();
    setUserNickname(address);
  }

  const onChange = (e: any) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<{ file: File; thumbnail: any } | null>(null);

  const uploadImageToBrowser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);

      setImageFile({
        file: fileList[0],
        thumbnail: url,
      });
    }
  };

  const enabled = inputValues.title && inputValues.desc && Number(inputValues.price) > 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      {modalOpen && (
        <Modal close={() => setModalOpen(!modalOpen)}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              padding: '8px 24px',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Image Uploaded</span>
            <span style={{ fontSize: '12px', marginBottom: '20px' }}>Your image successfully uploaded.</span>

            <LargeButton
              onClick={() => {
                nav('/profile/upload-list');
              }}
              style={{ fontSize: '14px', fontWeight: 700, backgroundColor: baseColor.yellow, color: 'black' }}
            >
              Go to Upload List
            </LargeButton>
          </div>
        </Modal>
      )}

      <TopNavigator>
        <span style={{ fontSize: '18px' }}>Upload Image</span>
      </TopNavigator>

      <PaddingBox>
        <input
          type="file"
          accept="image/*"
          name="file"
          multiple
          ref={fileInputRef}
          onChange={uploadImageToBrowser}
          style={{ display: 'none' }}
        />
        <StyledBox type="button" onClick={() => fileInputRef?.current?.click()}>
          <img
            alt="add-img"
            src={imageFile?.thumbnail || plusIcon}
            style={{ width: imageFile ? '100%' : '20px', height: imageFile ? '100%' : '20px', borderRadius: '8px' }}
          />
        </StyledBox>
      </PaddingBox>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <PaddingBox>
          <RenderTextArea name="title" value={inputValues.title} onChange={onChange} title="Image Title" />
        </PaddingBox>
        <PaddingBox style={{ paddingTop: 0 }}>
          <RenderTextArea
            name="desc"
            value={inputValues.desc}
            title="Image Description"
            onChange={onChange}
            textAreaStyle={{ height: '140px' }}
          />
        </PaddingBox>
        <PaddingBox style={{ paddingTop: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Price</span>
              <span style={{ fontSize: '12px' }}>*Based on the large size</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledInput
                name="price"
                type="number"
                value={inputValues.price}
                placeholder="write price..."
                onChange={e => {
                  const value = Number(e.target.value);
                  if (value < 0) {
                    setInputValues({ ...inputValues, [e.target.name]: '' });
                  } else {
                    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
                  }
                }}
                style={{ width: '100%' }}
              />
              <span style={{ marginLeft: '16px', fontSize: '16px' }}>APT</span>
            </div>
            <span style={{ fontSize: '11px', marginTop: '8px', color: '#676767' }}>
              · If you upload a picture, it willl be automatically registered as a large size file, medium and small
              sizes are automatically registered. Medium is registered at a margin of 0.7 and small is 0.5 of the price
              you have decided.
            </span>
          </div>
        </PaddingBox>
      </div>

      <YellowBottomNavigator>
        <LargeButton
          disabled={!enabled}
          type="submit"
          style={{ backgroundColor: enabled ? 'black' : '#8E8E8E', textTransform: 'capitalize', marginTop: 'auto' }}
          onClick={async () => {
            setModalOpen(true);
            console.log('uploading broom! broom!');
            //and upload image to server
            await onchain.uploadImage({
              title: inputValues.title,
              description: inputValues.desc,
              price: parseInt(inputValues.price, 10),
              // eslint-disable-next-line
              img: imageFile?.file!,
              nickname: nickname as unknown as string,
            });
          }}
        >
          Upload Image
        </LargeButton>
      </YellowBottomNavigator>
    </div>
  );
};

const StyledBox = styled.button`
  width: 120px;
  min-height: 120px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 1px;
`;

const TextArea = styled.textarea`
  background-color: transparent;
  color: gray;
  border-color: rgba(255, 255, 255, 0.5);
  padding: 16px;
  border-radius: 8px;
  min-height: 48px;
  font-size: 14px;
  color: white;

  ::placeholder {
    color: #4e4e4b;
  }
`;

export default UploadPage;
