import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Pagination, Skeleton } from 'antd';

import { DefaultTableRecordType } from '../defaults/table';
import { CardTableToggleProps } from './helpers';
import useCardTableToggle from './useCardTableToggle';

const CardView = <RecordType extends DefaultTableRecordType = any>({
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
  return (
    <>
      <div className='flex gap-4 flex-wrap mt-2'>
        {state.loading
          ? Array.from(
              { length: state.paginationOptions.pageSize },
              (_, i) => i
            ).map((t) => (
              <Card
                key={`${props.title}-${t}`}
                className='w-80 shadow-md select-none'
                bodyStyle={{ padding: 16 }}
                {...props.cardProps}
              >
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            ))
          : state.data.docs.map((item) => (
              <Card
                key={item._id}
                bodyStyle={{ padding: 16 }}
                className='w-80 shadow-md select-none'
                {...props.cardProps}
                style={{
                  ...(props.cardProps.cardStyles
                    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      props.cardProps.cardStyles(item)
                    : {}),
                }}
              >
                <div className='flex h-full justify-between'>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <props.cardProps.renderer {...item} />

                  {props.editable && props.editPermission ? (
                    <Button
                      type='link'
                      icon={<EditOutlined />}
                      disabled={
                        props.disableEdit
                          ? props.disableEdit(item as RecordType)
                          : false
                      }
                      onClick={() => onEditButtonClick(item)}
                    />
                  ) : null}
                </div>
              </Card>
            ))}
      </div>

      <div className='w-full flex justify-end mt-4'>
        <Pagination
          {...{
            hideOnSinglePage: true,
            total: state.data.totalDocs,
            defaultPageSize: state.paginationOptions.pageSize,
            current: state.paginationOptions.pageNumber,
            showSizeChanger: true,
            pageSizeOptions: state.pageSizeOptions,
            onChange: setState.onPageNumberChange,
            onShowSizeChange: setState.onShowSizeChange,
          }}
        />
      </div>
    </>
  );
};

export default CardView;
