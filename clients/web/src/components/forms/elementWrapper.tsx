import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

import useFormbuilder from './useFormbuilder';

export type ElementWrapperProps = React.PropsWithChildren & {
  id: string;
};

const ElementWrapper: React.FC<ElementWrapperProps> = (props) => {
  const { selectElement, removeElement } = useFormbuilder();

  return (
    <div
      onClick={() => selectElement(props.id)}
      className='p-2 border-2 gap-2 rounded-md flex cursor-pointer'
    >
      {props.children}

      <div className='flex-shrink'>
        <Button
          icon={<CloseOutlined />}
          onClick={() => removeElement(props.id)}
        />
      </div>
    </div>
  );
};

export default ElementWrapper;
