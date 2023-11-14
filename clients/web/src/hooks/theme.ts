import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { recoilPersist } from 'recoil-persist';

export type Theme = 'light' | 'dark';
export type AppConfig = {
  theme: Theme;
  isCompact: boolean;
  isDark: boolean;
  sidebarOpen: boolean;
};

export const defaultAppConfig: AppConfig = {
  isCompact: false,
  isDark: false,
  sidebarOpen: false,
  theme: 'light',
};

const { persistAtom } = recoilPersist();
export const themeConfigAtom = atom<AppConfig>({
  key: 'themeConfigAtom',
  default: defaultAppConfig,
  effects: [persistAtom],
});

export const useAppThemeConfig = () => useRecoilState(themeConfigAtom);

export const useAppThemeConfigValue = () => useRecoilValue(themeConfigAtom);

export const useSetAppThemeConfigTheme = () =>
  useSetRecoilState(themeConfigAtom);
