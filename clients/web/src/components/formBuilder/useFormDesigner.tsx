import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import { atom, useRecoilState } from 'recoil';

import {
  DesignerAtom,
  DesignerMode,
  FormBuilderMeta,
  FormElementInstance,
} from './constants';

const designerLeftAtom = atom<DesignerAtom>({
  key: 'designerAtom',
  default: {
    elements: [],
    mode: 'edit',
    selectedElement: null,
    formProps: {},
  },
});

const useDesignerState = () => useRecoilState(designerLeftAtom);

const findElementById = (
  key: string,
  searchSpace: FormElementInstance[]
): FormElementInstance | undefined => {
  return searchSpace
    .map((element) => {
      return element.key === key
        ? element
        : findElementById(key, element.children || []);
    })
    .filter((t) => !!t)[0];
};

const updateElementById = (
  updatedElement: FormElementInstance,
  searchSpace: FormElementInstance[]
): FormElementInstance[] => {
  return searchSpace.reduce<FormElementInstance[]>((acc, element) => {
    return [
      ...acc,
      ...(element.key === updatedElement.key
        ? [{ ...element, ...updatedElement }]
        : [
            {
              ...element,
              children: updateElementById(
                updatedElement,
                element.children || []
              ),
            },
          ]),
    ];
  }, []);
};

const removeElementById = (
  key: string,
  searchSpace: FormElementInstance[]
): FormElementInstance[] => {
  return searchSpace.reduce<FormElementInstance[]>((acc, element) => {
    return [
      ...acc,
      ...(element.key === key
        ? []
        : [
            {
              ...element,
              children: removeElementById(key, element.children || []),
            },
          ]),
    ];
  }, []);
};

const useDesigner = () => {
  const [designer, setDesigner] = useDesignerState();

  const onDragEnd = (e: any) => {
    console.log('onDragEnd', e);
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const addElement = (element: Omit<FormElementInstance, 'key'>) => {
    setDesigner((prev) => {
      const newElement = { ...element, key: nanoid() };
      return {
        ...prev,
        selectedElement: newElement,
        elements: [...prev.elements, newElement],
      };
    });
  };

  const updateElement = (updatedElement: FormElementInstance) => {
    setDesigner((prev) => ({
      ...prev,
      elements: updateElementById(updatedElement, prev.elements),
    }));
  };

  const removeElement = (key: string) => {
    setDesigner((prev) => ({
      ...prev,
      selectedElement: null,
      elements: removeElementById(key, prev.elements),
    }));
  };

  const selectElement = (key: string) => {
    setDesigner((prev) => ({
      ...prev,
      selectedElement:
        findElementById(key, prev.elements) || prev.selectedElement,
    }));
  };

  const onSaveRootFormProps = (values: Record<string, string | number>) => {
    setDesigner((prev) => ({ ...prev, formProps: values }));
  };

  const setElements = (
    meta: FormBuilderMeta,
    formProps: Record<string, string | number>
  ) => {
    setDesigner((prev) => ({ ...prev, elements: meta, formProps }));
  };

  const setMode = (val: DesignerMode) => {
    setDesigner((p) => ({ ...p, mode: val }));
  };

  const showFormParentProps = () => {
    setDesigner((prev) => ({ ...prev, selectedElement: null }));
  };

  return {
    setMode,
    sensors,
    onDragEnd,
    addElement,
    setElements,
    selectElement,
    updateElement,
    removeElement,
    showFormParentProps,
    mode: designer.mode,
    onSaveRootFormProps,
    elements: designer.elements,
    formProps: designer.formProps,
    selectedElement: designer.selectedElement,
  };
};

export default useDesigner;
