import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export type Theme = 'light' | 'dark';

export const themeAtom = atom<Theme>({
  key: 'themeAtom',
  default: 'light',
});

export const useTheme = () => useRecoilState(themeAtom);

export const useThemeValue = () => useRecoilValue(themeAtom);

export const useSetTheme = () => useSetRecoilState(themeAtom);
