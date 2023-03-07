import { ApiError, AptosClient, TokenClient, TokenTypes } from 'aptos';
import { TableItemRequest, ViewRequest } from 'aptos/src/generated';
import { SetterOrUpdater } from 'recoil';
import { TPublicKeyState } from '../states/loginState';
import { uploadToIPFS } from './ipfs';
import { ImageInfo, TokenPurchaseItem, IUploadImage, IBuyImage, IProveImage, IReportImage, IReportResponse, IProveItem, IProofResponse, OnChainCommunicator } from './type';
import { TokenItem } from '../Components/RenderImageList';

export class AptosOnChainImpl implements OnChainCommunicator {
  private moduleAddress: string;

  private client: AptosClient;

  private tokenClient: TokenClient;

  private address: string;

  private publicKey: string;

  constructor() {
    this.moduleAddress = '0x5163ad43db9b7354a5bc8af9e4c18130ffe5c2d077ab52c0f6553827b2e8c15f';
    this.client = new AptosClient('https://fullnode.devnet.aptoslabs.com');
    this.tokenClient = new TokenClient(this.client);
    this.address = "";
    this.publicKey = "";
  }

  public async walletConnect(setAddress: SetterOrUpdater<string>, setPublicKey: SetterOrUpdater<TPublicKeyState>): Promise<void> {
    const { address, publicKey } = await window.aptos.connect();
    setAddress(address);
    setPublicKey(publicKey);
    this.address = address;
    this.publicKey = publicKey;
  }

  // read
  public async checkUserExists(setNickname: SetterOrUpdater<string>): Promise<boolean> {
    const UserResource: { data: any } = await this.client.getAccountResource(
      this.moduleAddress,
      `${this.moduleAddress}::user_manager::UserStore`,
    );

    const { handle }: { handle: string } = UserResource.data.nicknames;
    const { address } = await window.aptos.account();
    const getTableItemRequest: TableItemRequest = {
      key_type: 'address',
      value_type: '0x1::string::String',
      key: address,
    };

    try {
      const result = await this.client.getTableItem(handle, getTableItemRequest);
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
  }

  public async submitUserNickname(userAddress: string, userNickname: string): Promise<void> {
    const transaction = {
      type: 'entry_function_payload',
      function: `${this.moduleAddress}::user_manager::set_user_nickname`,
      arguments: [userAddress, userNickname],
      type_arguments: [],
    };

    try {
      await window.aptos.signAndSubmitTransaction(transaction);
    } catch (error: any) {
      console.log(error);
    }
  }

  public async getUserNickname(userAddress: string): Promise<string> {
    const UserResource: { data: any } = await this.client.getAccountResource(
      this.moduleAddress,
      `${this.moduleAddress}::user_manager::UserStore`,
    );

    const { handle }: { handle: string } = UserResource.data.nicknames;
    const getTableItemRequest: TableItemRequest = {
      key_type: 'address',
      value_type: '0x1::string::String',
      key: userAddress,
    };

    try {
      const result = await this.client.getTableItem(handle, getTableItemRequest);
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
  }

  public async getImageInfo(creatorAddress: string, creatorNickname: string, imageTitle: string): Promise<ImageInfo> {
    const viewRequest: ViewRequest = {
      function: `${this.moduleAddress}::marketplace::get_image_id`,
      type_arguments: [],
      arguments: [creatorAddress, creatorNickname, imageTitle],
    };

    try {
      const result = await this.client.view(viewRequest);
      const tokenDataIds = result as unknown as TokenTypes.TokenDataId[];
      const tokenDataId = tokenDataIds[0];
      const tokenData = await this.tokenClient.getTokenData(tokenDataId.creator, tokenDataId.collection, tokenDataId.name);
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
  }

  public async tokendataIdToUri(tokenDataId: { creator: string; collection: string; name: string }): Promise<string> {
    const tokenData = await this.tokenClient.getTokenData(tokenDataId.creator, tokenDataId.collection, tokenDataId.name);
    return tokenData.uri;
  }

  public async getAllImageInfoList(): Promise<TokenItem[]> {
    const tokens2: TokenItem[] = [];
    const viewRequest: ViewRequest = {
      function: `${this.moduleAddress}::marketplace::get_all_images`,
      type_arguments: [],
      arguments: [],
    };

    try {
      const result = await this.client.view(viewRequest);
      const result1 = result as {
        data: { key: { collection: string; creator: string; name: string }; value: { amount: string } }[];
      }[];
      const tokens = result1[0].data;

      // eslint-disable-next-line
      for (const token of tokens) {
        // eslint-disable-next-line
        const uri = await this.tokendataIdToUri({
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
  }

  public async getUploadedImageList(address: string): Promise<TokenItem[]> {
    const viewRequest: ViewRequest = {
      function: `${this.moduleAddress}::marketplace::get_uploaded_images`,
      type_arguments: [],
      arguments: [address],
    };

    const tokens: TokenItem[] = [];

    try {
      const result = await this.client.view(viewRequest);
      const [tokenDataIdList] = result as TokenTypes.TokenDataId[][];
      // eslint-disable-next-line
      for (const token of tokenDataIdList) {
        // eslint-disable-next-line
        const uri = await this.tokendataIdToUri({ creator: token.creator, collection: token.collection, name: token.name });
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
  }

  public async getPurchasedImageList(address: string): Promise<TokenPurchaseItem[]> {
    const viewRequest: ViewRequest = {
      function: `${this.moduleAddress}::marketplace::get_purchased_images`,
      type_arguments: [],
      arguments: [address],
    };

    const tokens: TokenPurchaseItem[] = [];

    try {
      const result = await this.client.view(viewRequest);
      const [tokenDataIdList] = result as TokenTypes.TokenId[][];
      // eslint-disable-next-line
      for (const tokenId of tokenDataIdList) {
        //@ts-ignore:next-line;
        const token = tokenId.token_data_id;
        // eslint-disable-next-line
        const uri = await this.tokendataIdToUri({ creator: token.creator, collection: token.collection, name: token.name });

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
  }

  public async getReportList(nickname: string): Promise<IProveItem[]> {
    const viewRequest: ViewRequest = {
      function: `${this.moduleAddress}::owner_prover::get_report_list`,
      type_arguments: [],
      arguments: [nickname],
    };

    try {
      const result = await this.client.view(viewRequest);
      const reportResponse = result as IReportResponse[];

      const reportList = await Promise.all(reportResponse[0].data.map(async (r) => {
        const rDate = new Date(r.value.timestamp * 1000);
        const uri = await this.tokendataIdToUri({ creator: r.value.image.creator, collection: r.value.image.collection, name: r.value.image.name });
        // eslint-disable-next-line no-nested-ternary
        const proveStatus = r.value.proved ? 1 : rDate.getTime() < new Date().getTime() ? 0 : 2;
        const reportCase: IProveItem = {
          proved: proveStatus,
          title: r.value.image.name,
          creator: r.value.image.creator,
          requestedDate: new Date(r.value.timestamp * 1000),
          provedDate: null,
          keyPhrase: r.key as unknown as string,
          uri,
        };
        return reportCase;
      }));

      return reportList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async getProveList(nickname: string): Promise<IProveItem[]> {
    const viewRequest: ViewRequest = {
      function: `${this.moduleAddress}::owner_prover::get_proof_list`,
      type_arguments: [],
      arguments: [nickname],
    };

    try {
      const result = await this.client.view(viewRequest);
      const reportResponse = result[0] as IProofResponse[];
      const reportList = await Promise.all(reportResponse.map(async (r) => {
        const rDate = new Date(r.timestamp * 1000);
        const proveStatus = 1;
        const uri = await this.tokendataIdToUri({ creator: r.image.creator, collection: r.image.collection, name: r.image.name });
        const reportCase: IProveItem = {
          proved: proveStatus,
          title: r.image.name,
          creator: r.image.collection.replace('\'s Collection', ''),
          requestedDate: null,
          provedDate: rDate,
          keyPhrase: r.phrase as unknown as string,
          uri,
        };
        return reportCase;
      }));

      return reportList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // write
  public async uploadImage(nft: IUploadImage): Promise<void> {
    const creatorName = nft.nickname;
    const imageUri = await uploadToIPFS(nft.img);
    const transaction = {
      type: 'entry_function_payload',
      function: `${this.moduleAddress}::marketplace::upload_image`,
      arguments: [creatorName, nft.title, nft.description, imageUri, nft.price],
      type_arguments: [],
    };

    try {
      await window.aptos.signAndSubmitTransaction(transaction);
    } catch (error: any) {
      console.log('failed uploading stock image', error);
    }
  }

  public async buyImage(nft: IBuyImage): Promise<void> {
    const transaction = {
      type: 'entry_function_payload',
      function: `${this.moduleAddress}::marketplace::purchase_image`,
      arguments: [nft.creator, nft.creatorNickname, nft.imageTitle, nft.size, nft.expiry],
      type_arguments: [],
    };

    try {
      await window.aptos.signAndSubmitTransaction(transaction);
    } catch (error: any) {
      console.log(error);
    }
  }

  public async proveImage(proof: IProveImage): Promise<void> {
    const transaction = {
      type: 'entry_function_payload',
      function: `${this.moduleAddress}::owner_prover::prove_ownership`,
      arguments: [proof.userNickname, proof.creatorNickname, proof.imageTitle, proof.phrase],
      type_arguments: [],
    };

    try {
      await window.aptos.signAndSubmitTransaction(transaction);
    } catch (error: any) {
      console.log(error);
    }
  }

  public async reportImage(report: IReportImage): Promise<void> {
    const transaction = {
      type: 'entry_function_payload',
      function: `${this.moduleAddress}::owner_prover::submit_report`,
      arguments: [report.creatorNickname, report.imageTitle, report.randomPhrase],
      type_arguments: [],
    };

    try {
      await window.aptos.signAndSubmitTransaction(transaction);
    } catch (error: any) {
      console.log(error);
    }
  }
}
