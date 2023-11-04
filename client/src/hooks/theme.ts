import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type Theme = 'light' | 'dark';

const { persistAtom } = recoilPersist();
export const themeAtom = atom<Theme>({
  key: 'themeAtom',
  default: 'light',
  effects: [persistAtom],
});

export const useTheme = () => useRecoilState(themeAtom);

export const useThemeValue = () => useRecoilValue(themeAtom);

export const useSetTheme = () => useSetRecoilState(themeAtom);
