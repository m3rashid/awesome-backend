import { TableColumnsType } from 'antd';
import dayjs from 'dayjs';

export type DefaultTableRecordType = Record<string, any> & { _id?: string };

export const showTimeEntry = <RecordType extends DefaultTableRecordType>(
  title: React.ReactNode,
  dataIndex: string
): TableColumnsType<RecordType> => [
  {
    title,
    dataIndex,
    key: dataIndex,
    width: 170,
    render: (t: any) => dayjs(t).format('DD-MM-YYYY HH:mm A'),
    sorter: (a: RecordType, b: RecordType, c: any) => {
      return c === 'descend'
        ? dayjs(a.dataIndex).diff(dayjs(b.dataIndex)) >= 0
          ? 1
          : -1
        : dayjs(a.dataIndex).diff(dayjs(b.dataIndex)) <= 0
        ? 1
        : -1;
    },
  },
];
