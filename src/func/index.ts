import { ApiError, AptosClient } from 'aptos';
import { AptosGeneratedClient, TableItemRequest, ViewRequest } from 'aptos/src/generated';
import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { addressState, nicknameState } from '../states/loginState';
import UploadToIPFS from './ipfs';

const moduleAddress = '0x31042e3e36cf44e07abcd707fb04becaa474141f42933c6dd6e3d29858f46b4c';

export const walletConnect = async (setAddress: any, setPublicKey: any) => {
  /**
   * init function
   */
  // connect
  const { address, publicKey } = await window.aptos.connect();
  setAddress(address);
  setPublicKey(publicKey);

  return { address, publicKey };
};

export const checkUserExists = async (userAddress: string, setNickname: any) => {
  const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');

  const UserResource: { data: any } = await client.getAccountResource(
    moduleAddress,
    `${moduleAddress}::user_manager::UserStore`,
  );
  const { handle }: { handle: string } = UserResource.data.nicknames;
  const { publicKey } = await window.aptos.account();
  const getTableItemRequest: TableItemRequest = {
    key_type: 'address',
    value_type: '0x1::string::String',
    key: publicKey,
  };

  try {
    const result = await client.getTableItem(handle, getTableItemRequest);
    setNickname(result);
  } catch (err) {
    // FIXME
    const error = err as ApiError;
    if (error.errorCode === 'table_item_not_found') {
      return false;
    }

    console.log(error);
    return false;
  }
  return true;
};

export const submitUserNickname = async (userAddress: string, userNickname: string) => {
  const { publicKey } = await window.aptos.account();
  const transaction = {
    type: 'entry_function_payload',
    function: `${moduleAddress}::user_manager::set_user_nickname`,
    arguments: [publicKey, userNickname],
    type_arguments: [],
  };

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log(error);
  }
};

interface ImageInfo {
  id: string;
  title: string;
  price: number;
  expiry: number;
  description: string;
  creator: string;
  imgUrl: string;
}
export const getImageInfo = () => { };

export const getImageInfoList = async () => {
  const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::user_manager::set_user_nickname`,
    type_arguments: [],
    arguments: [],
  };

  try {
    // const result = await client?.view(viewRequest);
  } catch (error) {
    // do sth
  }

  // TODO
};

interface IDownloadImage {
  id: string;

}
export const downloadImage = async () => {

};

interface IUploadImage {
  nickname: string,
  title: string;
  description: string;
  price: number;
  img: File;
}
export const uploadImage = async (nft: IUploadImage) => {
  const { publicKey: creator } = await window.aptos.account();
  const creatorName = nft.nickname;
  const imageUri = await UploadToIPFS(nft.img);
  console.log(imageUri);
  const transaction = {
    type: "entry_function_payload",
    function: `${moduleAddress}::marketplace::upload_image`,
    arguments: [creatorName, nft.title, nft.description, imageUri, nft.price],
    type_arguments: [],
  };
  console.log("transaction ready!");

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log("failed uploading stock image", error);
  }
};

interface IBuyImage {
  id: string;
  size: number;
  creator: string;
  imageTitle: string;
  expiry: number;
}
export const buyImage = async (nft: IBuyImage) => {
  const { publicKey: user } = await window.aptos.account();
  const transaction = {
    type: "entry_function_payload",
    function: `${moduleAddress}::marketplace::purchase_image`,
    arguments: [user, nft.creator, nft.imageTitle, nft.size, nft.expiry],
    type_arguments: [],
  };

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log("damn", error);
  }
};

//report, prove
interface IProveImage {
  address: string;
  phrase: string;
}
export const proveImage = () => {};

interface IReportImage {
  address: string;
  email: string;
}
export const reportImage = () => { };
//image? || images[]?
