import { ApiError, AptosClient, TokenClient, TokenTypes } from 'aptos';
import { AptosGeneratedClient, TableItemRequest, ViewRequest } from 'aptos/src/generated';
import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { addressState, nicknameState } from '../states/loginState';
import UploadToIPFS from './ipfs';
import { TokenItem } from '../Components/RenderImageList';

const moduleAddress = "0x13aabca9cb7edee47f7fa6eb8d501c1332307d53e2689f1a763a0442e5101885";
const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
const tokenClient = new TokenClient(client);

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
export const getImageInfo = async (creatorAddress: string, imageTitle: string): Promise<ImageInfo | null> => {
  // const creatorAddress = '0x2e35131572a43a1d82b4678857cb6fa44722367483250dfd7d87a25c1deeaf04';
  // const imageTitle = '';

  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::marketplace::get_image_id`,
    type_arguments: [],
    arguments: [creatorAddress, imageTitle],
  };

  try {
    const result = await client.view(viewRequest);
    const tokenDataId = result as unknown as TokenTypes.TokenDataId;

    const tokenData = await tokenClient.getTokenData(tokenDataId.creator, tokenDataId.collection, tokenDataId.name);

    return {
      id: '',
      title: tokenData.name,
      price: 0,
      expiry: 0,
      description: tokenData.description,
      creator: tokenDataId.creator,
      imgUrl: tokenData.uri,
    };
  } catch (error) {
    console.log('getImageInfo', error);
    // do sth
    return null;
  }
};

const tokendataIdToUri = async (tokenDataId: { creator: string, collection: string, name: string }) => {
  const tokenData = await tokenClient.getTokenData(tokenDataId.creator, tokenDataId.collection, tokenDataId.name);
  return tokenData.uri;
};

export const getAllImageInfoList = async () => {
  const tokens2: TokenItem[] = [];
  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::marketplace::get_all_images`,
    type_arguments: [],
    arguments: [],
  };

  try {
    const result = await client.view(viewRequest);
    const result1 = result as { data: { key: { collection: string, creator: string, name: string }, value: { amount: string } }[] }[];
    const tokens = result1[0].data;

    // eslint-disable-next-line
    for (const token of tokens) {
      // eslint-disable-next-line
      const uri = await tokendataIdToUri({ creator: token.key.creator, collection: token.key.collection, name: token.key.name });
      tokens2.push({ creator: token.key.creator, collection: token.key.collection, name: token.key.name, uri, price: parseInt(token.value.amount, 10) });
    }
    console.log("tokens", tokens2);
    return [...tokens2];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUploadedImageList = async (address: string): Promise<TokenTypes.TokenDataId[]> => {
  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::marketplace::get_uploaded_images`,
    type_arguments: [],
    arguments: [address],
  };

  try {
    const result = await client.view(viewRequest);
    const tokenDataIdList = result as TokenTypes.TokenDataId[];
    console.log(tokenDataIdList);
    return tokenDataIdList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPurchasedImageList = async (): Promise<TokenTypes.TokenDataId[]> => {
  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::marketplace::get_all_images`,
    type_arguments: [],
    arguments: [],
  };

  try {
    // TODO
    const result = await client.view(viewRequest);
    const tokenDataIdList = result as TokenTypes.TokenDataId[];
  } catch (error) {
    console.log(error);
    return [];
  }

  return [];
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
  console.log(creatorName, nft.title, nft.description, imageUri, nft.price);
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
