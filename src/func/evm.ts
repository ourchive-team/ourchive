import { Signer, ethers } from 'ethers';
import { SetterOrUpdater } from 'recoil';
import { TPublicKeyState, nicknameState } from '../states/loginState';
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
import { UserManagerABI, MarketplaceABI, OwnerProverABI } from './evmABI';
import { TokenItem } from '../Components/ImageComponents/ImageSkeletonRenderer';

export class EvmOnChainImpl implements OnChainCommunicator {
    private signer: Signer;

    private provider;

    private userManagerAddress: string;

    private userManagerContract: ethers.Contract;

    private marketplaceAddress: string;

    private marketplaceContract: ethers.Contract;

    private ownerProverAddress: string;

    private ownerProverContract: ethers.Contract;

    constructor() {
        // goerli
        // this.userManagerAddress = "0x4bD46975bd9418c1091c1C1593F1216b15Ac5b5F";
        // this.marketplaceAddress = "0xE9945E2208b0A463CBA67306eACFd83b36668F6b";
        // this.ownerProverAddress = "0x3E286397e21198970b51D901A2e8F5EC91739DAB";

        // mumbai
        this.userManagerAddress = "0xD0F59a3187074B67a93836F1B9D0921b5093F151";
        this.marketplaceAddress = "0x5739fEfebA02B531D612F29d92C7218C70032002";
        this.ownerProverAddress = "0xa5B195CAB5050Cb8516C093C2ff775CF6a7578a8";

        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();

        this.userManagerContract = new ethers.Contract(this.userManagerAddress, UserManagerABI, this.signer);
        this.marketplaceContract = new ethers.Contract(this.marketplaceAddress, MarketplaceABI, this.signer);
        this.ownerProverContract = new ethers.Contract(this.ownerProverAddress, OwnerProverABI, this.signer);
    }

    public async walletConnect(
        setAddress: SetterOrUpdater<string>,
        setPublicKey: SetterOrUpdater<TPublicKeyState>,
    ): Promise<void> {
        if (this.userManagerAddress !== "" && this.marketplaceAddress !== "" && this.ownerProverAddress !== "") {
            console.log("walletConnect starts");
        }
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
        try {
            console.log("checkUserExists");
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const UserManagerContract = new ethers.Contract(this.userManagerAddress, UserManagerABI, signer);

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            const nickname = await this.userManagerContract.getUserNickname(accounts[0]);
            console.log(accounts[0]);
            console.log(accounts[0]);
            console.log(accounts[0]);
            setNickname(nickname);
            console.log("nickname", nickname);
        } catch (err) {
            console.log(this.checkUserExists.name, err);
            return false;
        }
        return true;
    }

    public async submitUserNickname(userAddress: string, userNickname: string): Promise<void> {
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const UserManagerContract = new ethers.Contract(this.userManagerAddress, UserManagerABI, signer);

            await this.userManagerContract.setUserNickname(userAddress, userNickname);
        } catch (err) {
            console.log(this.submitUserNickname.name, err);
        }
    }

    public async getUserNickname(userAddress: string): Promise<string> {
        let nickname;
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const UserManagerContract = new ethers.Contract(this.userManagerAddress, UserManagerABI, signer);

            nickname = await this.userManagerContract.getUserNickname(userAddress);
        } catch (err) {
            console.log(this.getUserNickname.name, err);
            throw (err);
        }
        console.log("nickname:", nickname);
        return nickname;
    }

    public async getImageInfo(creatorAddress: string, creatorNickname: string, imageTitle: string): Promise<ImageInfo> {
        let imageInfo = <ImageInfo>{};
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // const MarketplaceContract = new ethers.Contract(this.marketplaceAddress, MarketplaceABI, signer);

            console.log(creatorAddress, imageTitle);
            const { name, description, uri, price, creator, expiry } = await this.marketplaceContract.get_image_by_creator_and_name(creatorAddress, imageTitle);
            imageInfo = <ImageInfo>{
                title: name,
                price,
                expiry,
                description,
                creator,
                creatorNickname,
                imgUrl: uri,
            };
            console.log(imageInfo);
        } catch (err) {
            console.log(err);
        }
        return imageInfo;
    }

    public async tokendataIdToUri(tokenDataId: { creator: string; collection: string; name: string }): Promise<string> {
        const { imgUrl } = await this.getImageInfo(tokenDataId.creator, "", tokenDataId.name);
        return imgUrl;
    }

    public async getAllImageInfoList(): Promise<TokenItem[]> {
        const tokens: TokenItem[] = [];
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // const MarketplaceContract = new ethers.Contract(this.marketplaceAddress, MarketplaceABI, signer);

            const count = await this.marketplaceContract.latest_id();

            for (let i = 0; i < count; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                const { id, name, description, uri, price, creator, expiry } = await this.marketplaceContract.stock_images(i);
                // eslint-disable-next-line no-await-in-loop
                const creatorNickname = await this.getUserNickname(creator);
                const image = { creator, creatorNickname, collection: `${creatorNickname}'s collection`, name, uri, price };
                tokens.push(image);
                console.log("image", image);
            }
        } catch (err) {
            console.log(err);
            throw (err);
        }
        return tokens;
    }

    public async getUploadedImageList(address: string): Promise<TokenItem[]> {
        const tokens: TokenItem[] = [];
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // const MarketplaceContract = new ethers.Contract(this.marketplaceAddress, MarketplaceABI, signer);

            const images = await this.marketplaceContract.get_uploaded_images(address);
            console.log(images);
            for (let i = 0; i < images.length; i += 1) {
                const image = images[i];
                const item = { creator: image.creator, creatorNickname: image.creatorNickname, collection: `${image.creatorNickname}'s collection`, name: image.name, uri: image.uri, price: image.price };
                tokens.push(item);
            }
        } catch (err) {
            console.log(err);
            throw (err);
        }
        return tokens;
    }

    public async getPurchasedImageList(address: string): Promise<TokenPurchaseItem[]> {
        const tokens: TokenPurchaseItem[] = [];
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // const MarketplaceContract = new ethers.Contract(this.marketplaceAddress, MarketplaceABI, signer);

            const images = await this.marketplaceContract.get_purchased_images(address);
            console.log(images);
            for (let i = 0; i < images.length; i += 1) {
                const image = images[i];
                const item = { creator: image.creator, creatorNickname: image.creatorNickname, collection: `${image.creatorNickname}'s collection`, name: image.name, uri: image.uri, price: image.price };
                tokens.push({ token: item, expireDate: 0 });
            }
        } catch (err) {
            console.log(err);
            throw (err);
        }
        return tokens;
    }

    // write
    public async uploadImage(nft: IUploadImage): Promise<void> {
        const imageUri = await uploadToIPFS(nft.img);
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // const MarketplaceContract = new ethers.Contract(this.marketplaceAddress, MarketplaceABI, signer);

            // uint256 price, string calldata name, string calldata description, string calldata uri, uint256 expiry
            await this.marketplaceContract.upload_image(nft.price, nft.title, nft.description, imageUri, 0);
        } catch (err) {
            console.log(err);
            throw (err);
        }
    }

    public async buyImage(nft: IBuyImage): Promise<void> {
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // const MarketplaceContract = new ethers.Contract(this.marketplaceAddress, MarketplaceABI, signer);

            console.log("buyImage: ", nft.creator, nft.imageTitle);
            const { id } = await this.marketplaceContract.get_image_by_creator_and_name(nft.creator, nft.imageTitle);
            console.log("buyImage: ", id);

            await this.marketplaceContract.purchase_image(id);
        } catch (err) {
            console.log(err);
            throw (err);
        }
    }

    // owner prover

    public async proveImage(proof: IProveImage): Promise<void> {
        try {
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();

            // const OwnerProverContract = new ethers.Contract(this.ownerProverAddress, OwnerProverABI);
            console.log("prove image ownership: ", proof.imageTitle);
            this.ownerProverContract.prove_ownership(proof.userNickname, proof.creatorNickname, proof.imageTitle, proof.phrase);
        } catch (err) {
            console.log(err);
            throw (err);
        }
    }

    public async reportImage(report: IReportImage): Promise<void> {
        try {
            console.log("reporting image: ", report.imageTitle);
            this.ownerProverContract.submit_report(report.creatorNickname, report.imageTitle, report.randomPhrase);
        } catch (err) {
            console.log(err);
            throw (err);
        }
    }

    public async getReportList(nickname: string): Promise<IProveItem[]> {
        try {
            console.log("get report list: ", nickname);
            const { result } = this.ownerProverContract.get_report_list(nickname);
            console.log(result);
        } catch (err) {
            console.log(err);
            throw (err);
        }

        return [];
    }

    public async getProveList(nickname: string): Promise<IProveItem[]> {
        try {
            console.log("get prove list: ", nickname);
            const { result } = this.ownerProverContract.get_proof_list(nickname);
            console.log(result);
        } catch (err) {
            console.log(err);
            throw (err);
        }

        return [];
    }
}
