import { atom } from 'recoil';

export type Auth = {
  //
};

export const authAtom = atom<Auth>({
  key: 'authAtom',
  default: {
    //
  },
});
