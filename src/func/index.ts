import { ApiError, AptosClient, TokenClient, TokenTypes } from 'aptos';
import { AptosGeneratedClient, TableItemRequest, ViewRequest } from 'aptos/src/generated';
import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { addressState, nicknameState } from '../states/loginState';
import UploadToIPFS from './ipfs';
import { TokenItem } from '../Components/RenderImageList';

const moduleAddress = '0x0820229962fe76cef0a10942fe9031ed357fca0bd47b1bafef3b82e2c5b2a0da';
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com');
const tokenClient = new TokenClient(client);

export const walletConnect = async (setAddress: any, setPublicKey: any) => {
  /**
   * init function
   */
  // connect
  const { address, publicKey } = await window.aptos.connect();
  setAddress(address);
  setPublicKey(publicKey);
  console.log("setAddress, setPublicKey complete");

  return { address, publicKey };
};

export const checkUserExists = async (setNickname: any) => {
  const UserResource: { data: any } = await client.getAccountResource(
    moduleAddress,
    `${moduleAddress}::user_manager::UserStore`,
  );

  const { handle }: { handle: string } = UserResource.data.nicknames;
  const { address, publicKey } = await window.aptos.account();
  const getTableItemRequest: TableItemRequest = {
    key_type: 'address',
    value_type: '0x1::string::String',
    key: address,
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
    arguments: [userAddress, userNickname],
    type_arguments: [],
  };

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log(error);
  }
};

export const getUserNickname = async (userAddress: string) => {
  const UserResource: { data: any } = await client.getAccountResource(
    moduleAddress,
    `${moduleAddress}::user_manager::UserStore`,
  );

  const { handle }: { handle: string } = UserResource.data.nicknames;
  const { publicKey } = await window.aptos.account();
  const getTableItemRequest: TableItemRequest = {
    key_type: 'address',
    value_type: '0x1::string::String',
    key: userAddress,
  };

  try {
    const result = await client.getTableItem(handle, getTableItemRequest);
    return result as string;
  } catch (err) {
    // FIXME
    console.log(err);
    const error = err as ApiError;
    if (error.errorCode === 'table_item_not_found') {
      return '';
    }

    console.log(error);
    return '';
  }
  return '';
};

export interface ImageInfo {
  title: string;
  price: number;
  expiry: number;
  description: string;
  creator: string;
  creatorNickname: string;
  imgUrl: string;
}
export const getImageInfo = async (creatorAddress: string, creatorNickname: string, imageTitle: string): Promise<ImageInfo> => {
  // let creatorNickname = '';
  const UserResource: { data: any } = await client.getAccountResource(
    moduleAddress,
    `${moduleAddress}::user_manager::UserStore`,
  );

  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::marketplace::get_image_id`,
    type_arguments: [],
    arguments: [creatorAddress, creatorNickname, imageTitle],
  };

  try {
    const result = await client.view(viewRequest);
    const tokenDataIds = result as unknown as TokenTypes.TokenDataId[];
    const tokenDataId = tokenDataIds[0];
    const tokenData = await tokenClient.getTokenData(tokenDataId.creator, tokenDataId.collection, tokenDataId.name);
    return {
      title: tokenDataId.name,
      price: 0, // TODO
      expiry: 0,
      description: tokenData.description,
      creator: tokenDataId.creator,
      creatorNickname,
      imgUrl: tokenData.uri,
    };
  } catch (error) {
    // do sth
    return {
      title: '',
      price: 0,
      expiry: 0,
      description: '',
      creator: '',
      creatorNickname,
      imgUrl: '',
    };
  }
};

const tokendataIdToUri = async (tokenDataId: { creator: string; collection: string; name: string }) => {
  const tokenData = await tokenClient.getTokenData(tokenDataId.creator, tokenDataId.collection, tokenDataId.name);
  console.log(tokenData.default_properties);
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
    const result1 = result as {
      data: { key: { collection: string; creator: string; name: string }; value: { amount: string } }[];
    }[];
    const tokens = result1[0].data;

    // eslint-disable-next-line
    for (const token of tokens) {
      // eslint-disable-next-line
      const uri = await tokendataIdToUri({
        creator: token.key.creator,
        collection: token.key.collection,
        name: token.key.name,
      });
      tokens2.push({
        creator: token.key.creator,
        creatorNickname: token.key.collection.replace("'s Collection", ''), // FIXME
        collection: token.key.collection,
        name: token.key.name,
        uri,
        price: parseInt(token.value.amount, 10),
      });
    }
    return [...tokens2];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUploadedImageList = async (address: string): Promise<TokenItem[]> => {
  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::marketplace::get_uploaded_images`,
    type_arguments: [],
    arguments: [address],
  };

  const tokens: TokenItem[] = [];

  try {
    const result = await client.view(viewRequest);
    const tokenDataIdList = result as TokenTypes.TokenDataId[][];
    // eslint-disable-next-line
    for (const token of tokenDataIdList[0]) {
      // eslint-disable-next-line
      const uri = await tokendataIdToUri({ creator: token.creator, collection: token.collection, name: token.name });
      const creatorName = token.collection.replace("'s Collection", ''); // FIXME
      tokens.push({
        creator: token.creator,
        creatorNickname: creatorName,
        collection: token.collection,
        name: token.name,
        uri,
        price: 0,
      });
    }
    return tokens;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export interface TokenPurchaseItem {
  token: TokenItem,
  expireDate: number,
}

export const getPurchasedImageList = async (address: string): Promise<TokenPurchaseItem[]> => {
  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::marketplace::get_purchased_images`,
    type_arguments: [],
    arguments: [address],
  };

  const tokens: TokenPurchaseItem[] = [];

  try {
    const result = await client.view(viewRequest);
    const tokenDataIdList = result as TokenTypes.TokenId[][];
    console.log('purchase tokenDataIdList', tokenDataIdList);
    // eslint-disable-next-line
    for (const tokenId of tokenDataIdList[0]) {
      //@ts-ignore:next-line;
      const token = tokenId.token_data_id;
      console.log(token.creator, token.collection, token.name);
      // eslint-disable-next-line
      const uri = await tokendataIdToUri({ creator: token.creator, collection: token.collection, name: token.name });

      const creatorName = token.collection.replace("'s Collection", ''); // FIXME
      tokens.push({
        token: {
          creator: token.creator,
          creatorNickname: creatorName,
          collection: token.collection,
          name: token.name,
          uri,
          price: 0,
        },
        expireDate: 0,
      });
    }
    return tokens;
  } catch (error) {
    console.log(error);
    return [];
  }

  return [];
};

interface IDownloadImage {
  id: string;
}
export const downloadImage = async () => { };

interface IUploadImage {
  nickname: string;
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
    type: 'entry_function_payload',
    function: `${moduleAddress}::marketplace::upload_image`,
    arguments: [creatorName, nft.title, nft.description, imageUri, nft.price],
    type_arguments: [],
  };
  console.log('transaction ready!');

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log('failed uploading stock image', error);
  }
};

interface IBuyImage {
  size: number;
  creator: string;
  creatorNickname: string;
  imageTitle: string;
  expiry: number;
}
export const buyImage = async (nft: IBuyImage) => {
  const { address: user } = await window.aptos.account();
  console.log(user, nft);
  const transaction = {
    type: 'entry_function_payload',
    function: `${moduleAddress}::marketplace::purchase_image`,
    arguments: [nft.creator, nft.creatorNickname, nft.imageTitle, nft.size, nft.expiry],
    type_arguments: [],
  };

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log('damn', error);
  }
};

//report, prove
interface IProveImage {
  userNickname: string;
  creatorNickname: string;
  imageTitle: string;
  phrase: string;
}
export const proveImage = async (proof: IProveImage) => {
  const transaction = {
    type: 'entry_function_payload',
    function: `${moduleAddress}::owner_prover::prove_ownership`,
    arguments: [proof.userNickname, proof.creatorNickname, proof.imageTitle, proof.phrase],
    type_arguments: [],
  };
  console.log("proving incoming!!");

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log('damn', error);
  }
};

interface IReportImage {
  creatorNickname: string;
  imageTitle: string;
  randomPhrase: string;
}
export const reportImage = async (report: IReportImage) => {
  console.log(report.creatorNickname, report.imageTitle, report.randomPhrase);
  const transaction = {
    type: 'entry_function_payload',
    function: `${moduleAddress}::owner_prover::submit_report`,
    arguments: [report.creatorNickname, report.imageTitle, report.randomPhrase],
    type_arguments: [],
  };

  try {
    await window.aptos.signAndSubmitTransaction(transaction);
  } catch (error: any) {
    console.log('damn', error);
  }
};

// TODO
export interface IReportResponse {
  data : {
    [phrase : string]: {
      image : {
        collection : string,
        creator : string,
        name : string,
      }
      proved : boolean,
      timestamp : number,
    };
  }[]
}

type TProved = 0 | 1 | 2 | 3; // not proved = 0, proved = 1, cannot prove = 2
export interface IProveItem {
  proved: TProved;
  title: string;
  creator: string;
  requestedDate: Date; //Timestamp?
  provedDate: string; //Timestamp?
  keyPhrase: string;
}

export const getReportList = async (nickname: string) => {
  const viewRequest: ViewRequest = {
    function: `${moduleAddress}::owner_prover::get_report_list`,
    type_arguments: [],
    arguments: [nickname],
  };

  try {
    const result = await client.view(viewRequest);
    const reportResponse = result as IReportResponse[];
    // eslint-disable-next-line

    const reportList = reportResponse[0].data.map((r) => {
      const rDate = new Date(r.value.timestamp * 1000);
      // eslint-disable-next-line no-nested-ternary
      const proveStatus = r.value.proved ? 1 : rDate.getTime() < new Date().getTime() ? 0 : 2;
      const reportCase : IProveItem = {
        proved: proveStatus,
        title: r.value.image.name,
        creator: r.value.image.creator,
        requestedDate: new Date(r.value.timestamp * 1000),
        provedDate: proveStatus === 1 ? "TODO: DATE" : "Not proved yet",
        keyPhrase: r.key as unknown as string,
      };
      return reportCase;
    });

    return reportList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// TODO
export const getProveList = async () => {
  const OwnerProverStore: { data: any } = await client.getAccountResource(
    moduleAddress,
    `${moduleAddress}::owner_prover::OwnerProverStore`,
  );

  const { handle }: { handle: string } = OwnerProverStore.data.user_proof_table;
  const { address } = await window.aptos.account();
  const getTableItemRequest: TableItemRequest = {
    key_type: 'address',
    value_type: '0x1::string::String',
    key: address,
  };

  try {
    const result = await client.getTableItem(handle, getTableItemRequest);
    //TODO
    console.log(result);
  } catch (err) {
    // FIXME
    const error = err as ApiError;
    console.log(error);
    if (error.errorCode === 'table_item_not_found') {
      return [];
    }

    return [];
  }
  return [];
};
