import { SetterOrUpdater } from 'recoil';
import { TokenItem } from '../Components/RenderImageList';
import { TPublicKeyState } from '../states/loginState';

export interface ImageInfo {
  title: string;
  price: number;
  expiry: number;
  description: string;
  creator: string;
  creatorNickname: string;
  imgUrl: string;
}

export interface TokenPurchaseItem {
  token: TokenItem,
  expireDate: number,
}

export interface IDownloadImage {
  imageUri: string;
  imageTitle: string;
}

export interface IUploadImage {
  nickname: string;
  title: string;
  description: string;
  price: number;
  img: File;
}

export interface IBuyImage {
  size: number;
  creator: string;
  creatorNickname: string;
  imageTitle: string;
  expiry: number;
}

export interface IProveImage {
  userNickname: string;
  creatorNickname: string;
  imageTitle: string;
  phrase: string;
}

export interface IReportImage {
  creatorNickname: string;
  imageTitle: string;
  randomPhrase: string;
}

export interface IReportResponse {
  data: {
    [phrase: string]: {
      image: {
        collection: string,
        creator: string,
        name: string,
      }
      proved: boolean,
      timestamp: number,
    };
  }[]
}

type TProved = 0 | 1 | 2 | 3; // not proved = 0, proved = 1, cannot prove = 2

export interface IProveItem {
  proved: TProved;
  title: string;
  creator: string;
  requestedDate: Date | null; //Timestamp?
  provedDate: Date | null; //Timestamp?
  keyPhrase: string;
  uri: string;
}

export interface IProofResponse {
  image: {
    collection: string,
    creator: string,
    name: string,
  }
  phrase: string,
  timestamp: number,
}

// TODO
export interface OnChainCommunicator {
  walletConnect(setAddress: SetterOrUpdater<string>, setPublicKey: SetterOrUpdater<TPublicKeyState>): Promise<void>
  checkUserExists(setNickname: SetterOrUpdater<string>): Promise<boolean>
  submitUserNickname(userAddress: string, userNickname: string): Promise<void>
  getUserNickname(userAddress: string): Promise<string>
  getImageInfo(creatorAddress: string, creatorNickname: string, imageTitle: string): Promise<ImageInfo>
  tokendataIdToUri(tokenDataId: { creator: string; collection: string; name: string }): Promise<string>
  getAllImageInfoList(): Promise<TokenItem[]>
  getUploadedImageList(address: string): Promise<TokenItem[]>
  getPurchasedImageList(address: string): Promise<TokenPurchaseItem[]>
  getReportList(nickname: string): Promise<IProveItem[]>
  getProveList(nickname: string): Promise<IProveItem[]>
  uploadImage(nft: IUploadImage): Promise<void>
  buyImage(nft: IBuyImage): Promise<void>
  proveImage(proof: IProveImage): Promise<void>
  reportImage(report: IReportImage): Promise<void>
}
