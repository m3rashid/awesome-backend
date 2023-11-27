import { atom, useRecoilState } from 'recoil';

import { FormElementInstance } from './builder/constants';

export type DesignerMode = 'edit' | 'preview' | 'json';
export type DesignerAtom = {
  mode: DesignerMode;
  elements: FormElementInstance[];
  selectedElement: FormElementInstance | null;
};

export const designerLeftAtom = atom<DesignerAtom>({
  key: 'designerAtom',
  default: {
    elements: [],
    mode: 'edit',
    selectedElement: null,
  },
});

export const useDesignerState = () => useRecoilState(designerLeftAtom);
