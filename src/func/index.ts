import { ApiError, AptosClient } from 'aptos';
import { AptosGeneratedClient, TableItemRequest, ViewRequest } from 'aptos/src/generated';
import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { addressState } from '../states/loginState';

const moduleAddress = "0xc3c01947106a53503685245dd0ffb6d91c7622b590c8a249dab23af5819a3b4";

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
  const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");

  const UserResource: { data: any } = await client.getAccountResource(
    moduleAddress,
    `${moduleAddress}::user_manager::UserStore`,
  );
  const { handle }: { handle: string } = UserResource.data.nicknames;
  const { publicKey } = await window.aptos.account();
  const getTableItemRequest: TableItemRequest = {
    key_type: "address",
    value_type: "0x1::string::String",
    key: publicKey,
  };

  try {
    const result = await client.getTableItem(handle, getTableItemRequest);
    setNickname(result);
  } catch (err) { // FIXME
    const error = err as ApiError;
    if (error.errorCode === "table_item_not_found") {
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
    type: "entry_function_payload",
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
  const viewRequest : ViewRequest = {
    function: `${moduleAddress}::user_manager::set_user_nickname`,
    type_arguments: [],
    arguments: [],
  };

  try {
    const result = await client.view(viewRequest);
  } catch (error) {
    // do sth
  }

  // TODO
};

interface IDownloadImage {
  id: string;
}
export const downloadImage = () => { };

interface IUploadImage {
  title: string;
  description: string;
  price: number;
  img: any;
}
export const uploadImage = () => { };

interface IBuyImage {
  id: string;
}
export const buyImage = () => { };

//report, prove
interface IProveImage {
  address: string;
  phrase: string;
}
export const proveNFT = () => { };

interface IReportImage {
  address: string;
  email: string;
}
export const reportImage = () => { };
//image? || images[]?
