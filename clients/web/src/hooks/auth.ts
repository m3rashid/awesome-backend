import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export type User = {
  name: string;
  email: string;
};

export type Auth = {
  user: User | null;
  token: string | null;
};

export const authAtom = atom<Auth>({
  key: 'authAtom',
  default: {
    user: null,
    token: null,
  },
});

export const useAuth = () => useRecoilState(authAtom);
export const useAuthValue = () => useRecoilValue(authAtom);
export const useSetAuth = () => useSetRecoilState(authAtom);
