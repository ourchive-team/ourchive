import { atom, selector, useRecoilValue } from 'recoil';
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
