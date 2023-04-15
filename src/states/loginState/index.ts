import { atom } from 'recoil';
import { LoginStateEnum } from '../recoilKeys';
import { TokenItem } from '../../Components/ImageComponents/ImageSkeletonRenderer';

type TLoginState = {
  isLogin: boolean;
};

export const loginState = atom<TLoginState>({
  key: LoginStateEnum.LOGIN_STATE,
  default: {
    isLogin: false,
  },
});

export type TPublicKeyState = {
  publicKey: string;
};

export const publicKeyState = atom<TPublicKeyState>({
  key: LoginStateEnum.PUBLIC_KEY,
  default: {
    publicKey: '',
  },
});

type TSelectedMenu = string;

export const selectedMenuState = atom<TSelectedMenu>({
  key: LoginStateEnum.SELECTED_MENU,
  default: '',
});

type TNicknameState = string;
export const nicknameState = atom<TNicknameState>({
  key: LoginStateEnum.NICKNAME,
  default: '',
});

type TAddressState = string;
export const addressState = atom<TAddressState>({
  key: LoginStateEnum.ADDRESS,
  default: '',
});

type TUploadedImageList = TokenItem[];

export const uploadedImageList = atom<TUploadedImageList>({
  key: LoginStateEnum.UploadedImageList,
  default: [],
});
