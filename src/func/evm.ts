import { SetterOrUpdater } from 'recoil';
import { TPublicKeyState } from '../states/loginState';
import { uploadToIPFS } from './ipfs';
import {
    ImageInfo,
    TokenPurchaseItem,
    IUploadImage,
    IBuyImage,
    IProveImage,
    IReportImage,
    IReportResponse,
    IProveItem,
    IProofResponse,
    OnChainCommunicator,
  } from './type';
import { TokenItem } from '../Components/ImageComponents/ImageSkeletonRenderer';

export class EvmOnChainImpl implements OnChainCommunicator {
    // constructor() {

    // }

    public async walletConnect(
        setAddress: SetterOrUpdater<string>,
        setPublicKey: SetterOrUpdater<TPublicKeyState>,
        ): Promise<void> {
            if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
                try {
                    // Metamask is installed
                    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                    console.log(accounts[0]);
                    setAddress(accounts[0]);
                } catch (err: any) {
                    console.error(err.mesasge);
                }
            } else {
                // Metamask not installed
                console.log("Please install Metamask");
            }
    }

    // read
    public async checkUserExists(setNickname: SetterOrUpdater<string>): Promise<boolean> {
    // TODO
        return true;
    }

    public async submitUserNickname(userAddress: string, userNickname: string): Promise<void> {
    // TODO

    }

    public async getUserNickname(userAddress: string): Promise<string> {
    // TODO
    return '';
    }

    public async getImageInfo(creatorAddress: string, creatorNickname: string, imageTitle: string): Promise<ImageInfo> {
    // TODO
    return <ImageInfo>{};
    }

    public async tokendataIdToUri(tokenDataId: { creator: string; collection: string; name: string }): Promise<string> {
    // TODO
    return '';
    }

    public async getAllImageInfoList(): Promise<TokenItem[]> {
    // TODO
    return [];
    }

    public async getUploadedImageList(address: string): Promise<TokenItem[]> {
    // TODO
    return [];
    }

    public async getPurchasedImageList(address: string): Promise<TokenPurchaseItem[]> {
    // TODO
    return [];
    }

    public async getReportList(nickname: string): Promise<IProveItem[]> {
    // TODO
        return [];
    }

    public async getProveList(nickname: string): Promise<IProveItem[]> {
    // TODO
        return [];
    }

    // write
    public async uploadImage(nft: IUploadImage): Promise<void> {
    const creatorName = nft.nickname;
    const imageUri = await uploadToIPFS(nft.img);
    // TODO
    }

    public async buyImage(nft: IBuyImage): Promise<void> {
    // TODO
    }

    public async proveImage(proof: IProveImage): Promise<void> {
    // TODO
    }

    public async reportImage(report: IReportImage): Promise<void> {
    // TODO
    }
}
