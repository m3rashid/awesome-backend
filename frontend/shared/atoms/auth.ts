import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { User } from '../types/auth';

export type AuthAtom = {
  token: string;
  user: User;
};

export const authAtom = atom<AuthAtom | null>({
  key: 'authAtom',
  default: null,
});

export const useAuthValue = () => useRecoilValue(authAtom);

export const useAuthState = () => useRecoilState(authAtom);
