import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { LoginStateEnum } from '../recoilKeys';

type TLoginState = {
  isLogin: boolean;
};

export const loginState = atom<TLoginState>({
  key: LoginStateEnum.LOGIN_STATE,
  default: {
    isLogin: false,
  },
});

// type TLoginSelector = {
//   useLoginState: () => TLoginState;
// };
//
// const loginSelector = selector<TLoginState>({
//   key: LoginStateEnum.LOGIN_STATE,
//   get: ({ get }: any) => get(loginState).isLogin,
// });
//
// export const loginSelectors: TLoginSelector = {
//   useLoginState: () => useRecoilValue(loginSelector),
// };

type TPublicKeyState = {
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

// default: {} -> default:''
// object로 사용시 하나로 합쳐서 관리. (nickname, address)

// type TUserInfo = {
//   nickname: string;
//   address: string;
// };
// export const userInfoState = atom<TUserInfo>({
//   key: LoginStateEnum.NICKNAME,
//   default: {
//     nickname: '',
//     address: '',
//   },
// });

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
