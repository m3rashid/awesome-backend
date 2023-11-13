import { PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Empty, Form, Radio, Select } from 'antd';
import { capitalize } from 'lodash-es';

import { DefaultTableRecordType } from '../defaults/table';
import PageContainer from '../pageContainer';
import CardView from './cardView';
import { CardTableToggleProps, viewOptions } from './helpers';
import TableView from './tableView';
import useCardTableToggle from './useCardTableToggle';

const CardTableToggleView = <RecordType extends DefaultTableRecordType = any>(
  props: CardTableToggleProps<RecordType>
) => {
  const {
    state,
    isEdit,
    setState,
    handleOnAdd,
    handleRefresh,
    handleCreateEdit,
    handleCloseDrawer,
    onEditButtonClick,
  } = useCardTableToggle<RecordType>(props);

  return (
    <PageContainer
      me={props.pageContainerProps.me}
      loginURL={props.pageContainerProps.loginURL}
      header={{
        title: props.title,
        extra: [
          <div key={props.title} className='flex gap-4'>
            <Button onClick={handleRefresh} icon={<ReloadOutlined />} />
            {props.useFilter ? (
              <Select
                allowClear
                className='w-64'
                key='select-roles'
                value={state.filter}
                placeholder={`Filter by ${capitalize(
                  props.filterProps.filterKey as string
                )}`}
                onChange={(v) => setState.setFilter(v)}
                options={props.filterProps.options}
              />
            ) : null}
            <Radio.Group
              optionType='button'
              buttonStyle='outline'
              value={state.viewType}
              options={viewOptions.map((t) => ({
                label: `${capitalize(t)} View`,
                value: t,
              }))}
              onChange={({ target: { value } }) => setState.setViewType(value)}
            />

            {props.addable && props.addPermission ? (
              <Button
                type='primary'
                icon={<PlusCircleOutlined />}
                onClick={handleOnAdd}
              >
                Add {props.title}
              </Button>
            ) : null}
          </div>,
        ],
      }}
    >
      {props.addEditInNewPage ? null : (
        <Drawer
          width={320}
          destroyOnClose
          open={state.edit.open}
          key={state.edit.data?._id}
          styles={{ body: { padding: 12 } }}
          onClose={handleCloseDrawer}
          title={`${isEdit() ? 'Update' : 'Add'} ${props.title}`}
          footer={
            <div className='flex gap-2 h-12 items-center justify-between'>
              <Button type='primary' onClick={handleCreateEdit}>
                {`${isEdit() ? 'Update' : 'Add'} ${props.title}`}
              </Button>
              <Button onClick={handleCloseDrawer}>Cancel</Button>
            </div>
          }
        >
          <Form
            form={props.form}
            layout='vertical'
            {...(isEdit() && state.edit.data
              ? { initialValues: state.edit.data }
              : {})}
          >
            <props.DrawerAddForm {...state.edit.data} />
          </Form>
        </Drawer>
      )}

      {!state.loading && state.data.docs.length === 0 ? (
        <Card className='h-96 w-full flex items-center justify-center'>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={`No ${props.title} found`}
          />
        </Card>
      ) : state.viewType === 'table' ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <TableView<RecordType>
          {...{ props, state, setState, onEditButtonClick }}
        />
      ) : state.viewType === 'card' ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <CardView<RecordType>
          {...{ props, state, setState, onEditButtonClick }}
        />
      ) : null}
    </PageContainer>
  );
};

export default CardTableToggleView;
