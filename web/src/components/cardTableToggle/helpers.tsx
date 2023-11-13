import { CardProps, FormInstance, TableProps } from 'antd';

import { Service } from '../../helpers/service';
import { PaginatedList } from '../defaults/pagination';
import { PageContainerProps } from '../pageContainer';
// import { PageContainerProps } from '../PageContainer';

export const viewOptions = ['card', 'table'] as const;
export type ViewType = (typeof viewOptions)[number];

export type CardTableToggleProps<RecordType> = {
  title: string;
  defaultViewType?: ViewType;
  cardProps: CardProps & {
    renderer: React.FC<RecordType>;
    cardStyles?: (item: RecordType) => React.CSSProperties;
  };
  disableEdit?: (item: RecordType) => boolean;
  tableProps: TableProps<RecordType> & {
    noCreatedAt?: boolean;
    noUpdatedAt?: boolean;
  };
  defaultValuesOnAdd?: any;
  pageContainerProps: Pick<PageContainerProps, 'loginURL' | 'me'>;

  navigate: (url: string) => void;
} & (
  | { useFilter: false }
  | {
      useFilter: true;
      filterProps: {
        filterKey: keyof RecordType;
        options: { label: string; value: string }[];
      };
    }
) &
  (
    | { addEditInNewPage: true; addEditPageURL: (item?: RecordType) => string }
    | {
        addEditInNewPage: false;
        onDrawerClose?: () => void;
        form: FormInstance<RecordType>;
        DrawerAddForm: React.FC<any>;
      }
  ) &
  (
    | { editable: false }
    | {
        editable: true;
        editPermission: boolean;
        editService: Service<RecordType>;
        editTransformer?: (data: RecordType) => any | false;
        editConfirmTransformer: (data: RecordType) => Promise<any>;
      }
  ) &
  (
    | { addable: false }
    | {
        addable: true;
        addPermission: boolean;
        addService: Service<RecordType>;
        addConfirmTransformer: (data: RecordType) => Promise<any>;
      }
  ) & {
    listPermission: boolean;
    listService: Service<PaginatedList<RecordType>>;
  };
