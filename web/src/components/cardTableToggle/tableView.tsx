import { EditOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { DefaultTableRecordType, showTimeEntry } from '../defaults/table';
import { CardTableToggleProps } from './helpers';
import useCardTableToggle from './useCardTableToggle';

const TableView = <RecordType extends DefaultTableRecordType = any>({
  props,
  state,
  setState,
  onEditButtonClick,
}: {
  props: CardTableToggleProps<RecordType>;
  state: ReturnType<typeof useCardTableToggle>['state'];
  setState: ReturnType<typeof useCardTableToggle>['setState'];
  onEditButtonClick: ReturnType<typeof useCardTableToggle>['onEditButtonClick'];
}) => {
  const tableColumns: ColumnsType<RecordType> = [
    {
      title: 'Sl.No.',
      key: 'slNo',
      width: 50,
      align: 'right',
      render: (_: any, __: any, index: number) => `${index + 1}.`,
    },
    ...(props.tableProps.columns || []),
    ...(props.tableProps.noCreatedAt
      ? []
      : showTimeEntry<RecordType>('Created At', 'createdAt')),
    ...(props.tableProps.noUpdatedAt
      ? []
      : showTimeEntry<RecordType>('Updated At', 'updatedAt')),
    ...(props.editable && props.editPermission
      ? [
          {
            title: 'Action',
            key: 'action',
            render: (text: any, record: RecordType) => (
              <Button
                icon={<EditOutlined />}
                onClick={() => onEditButtonClick(record)}
              />
            ),
          },
        ]
      : []),
  ];

  return (
    <div className='overflow-x-auto max-w-[100vw] mb-24'>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Table<RecordType>
        columns={tableColumns}
        {...{
          rowKey: '_id',
          dataSource: state.data.docs.map((t) => ({ ...t, key: t._id })),
          pagination: {
            size: 'default',
            hideOnSinglePage: true,
            position: ['bottomRight'],
            total: state.data.totalDocs,
            defaultPageSize: state.paginationOptions.pageSize,
            current: state.paginationOptions.pageNumber,
            showSizeChanger: true,
            pageSizeOptions: state.pageSizeOptions,
            onChange: setState.onPageNumberChange,
            onShowSizeChange: setState.onShowSizeChange,
          },
          style: {
            height: '100%',
            minHeight: '500px',
            ...props.tableProps.style,
          },
          loading: state.loading,
          ...props.tableProps,
        }}
      />
    </div>
  );
};

export default TableView;
