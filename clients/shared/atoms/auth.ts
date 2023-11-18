import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { User } from '../types/schema';

export type AuthAtom = {
  token: string;
  user: User;
};

export const authAtom = atom<AuthAtom | null>({
  key: 'authAtom',
  default: null,
});

export const useAuthAtomValue = () => useRecoilValue(authAtom);

export const useAuthAtomState = () => useRecoilState(authAtom);
