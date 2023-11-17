import { notification } from 'antd';
import { useEffect, useState } from 'react';

import {
  listDefaultResponse,
  PaginatedList,
  TablePagination,
  tablePaginationDefault,
} from '../defaults/pagination';
import { DefaultTableRecordType } from '../defaults/table';
import { CardTableToggleProps, ViewType } from './helpers';

const modalDefault = { data: null, open: false };

const useCardTableToggle = <RecordType extends DefaultTableRecordType = any>(
  props: CardTableToggleProps<RecordType>
) => {
  const navigate = props.navigate || (() => {});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<{ data: RecordType | null; open: boolean }>(
    modalDefault
  );
  const [filter, setFilter] = useState<string | null>(null);
  const [viewType, setViewType] = useState<ViewType>(
    props.defaultViewType || 'card'
  );
  const [data, setData] = useState<PaginatedList<RecordType>>(
    listDefaultResponse<RecordType>()
  );
  const [paginationOptions, setPaginationOptions] = useState<TablePagination>(
    tablePaginationDefault
  );

  const showNotPermitted = () => {
    return notification.warning({
      key: `no-edit-${props.title}`,
      message: 'You do not have permission for this action',
    });
  };

  const isEdit = () => {
    return !!(Object.keys(edit.data || {}).length > 0 && edit.data?._id);
  };

  const handleCloseDrawer = () => {
    setEdit(modalDefault);
    if (!props.addEditInNewPage) {
      props.form.resetFields();
      if (props.onDrawerClose) props.onDrawerClose();
    }
  };

  const handleCreateEdit = async () => {
    try {
      if (props.addEditInNewPage) return;

      await props.form.validateFields();
      let values = { ...edit.data, ...props.form.getFieldsValue() };

      if (isEdit()) {
        if (!props.editable || !props.editPermission) {
          showNotPermitted();
          return;
        }

        values = await props.editConfirmTransformer(values);
        // await props.editService({ data: values });
      } else {
        if (!props.addable || !props.addPermission) {
          showNotPermitted();
          return;
        }

        values = await props.addConfirmTransformer(values);
        // await props.addService({ data: values });
      }
    } catch (err: any) {
      console.log(err);
      notification.error({
        key: `${props.title}-error`,
        message: 'Something went wrong! Could not save the record',
        ...(err.errorFields && err.errorFields.length > 0
          ? {
              description: `${err.errorFields
                .reduce(
                  (acc: string[], curr: any) => [
                    ...acc,
                    curr.errors.join(', '),
                  ],
                  []
                )
                .join(', ')}`,
            }
          : {}),
      });
      // }
    } finally {
      handleCloseDrawer();
      handleRefresh();
    }
  };

  const handleRefresh = async () => {
    list().catch(console.log);
  };

  const handleOnAdd = () => {
    if (props.addEditInNewPage) {
      navigate(props.addEditPageURL());
      return;
    }

    setEdit({ data: props.defaultValuesOnAdd ?? null, open: true });
  };

  const onEditButtonClick = (item: RecordType) => {
    if (!props.editable || !props.editPermission) {
      showNotPermitted();
      return;
    }

    if (props.addEditInNewPage) {
      navigate(props.addEditPageURL(item));
      return;
    }

    if (props.editTransformer) {
      const transformed = props.editTransformer(item);
      if (transformed === false) {
        notification.error({
          message: 'Restricted Item, Cannot edit this item',
          key: `${props.title}-error`,
        });
        return;
      }

      setEdit({ data: transformed, open: true });
      props.form.setFieldsValue(transformed);
    } else {
      setEdit({ data: item, open: true });
      props.form.setFieldsValue(item as any);
    }
  };

  const list = async () => {
    try {
      setLoading(true);
      // const { data } = await props.listService({
      //   data: {
      //     page: paginationOptions.pageNumber,
      //     limit: paginationOptions.pageSize,
      //   },
      // });
      // setData(data);
    } finally {
      setLoading(false);
    }
  };

  const onShowSizeChange = (page: number, limit: number) => {
    setPaginationOptions({
      pageNumber: page,
      pageSize: limit,
    });
  };

  const onPageNumberChange = (pageNo: number) => {
    setPaginationOptions((p) => ({ ...p, pageNumber: pageNo }));
  };

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationOptions]);

  return {
    state: {
      edit,
      data,
      filter,
      loading,
      viewType,
      paginationOptions,
      pageSizeOptions: ['10', '15', '20', '25'],
    },
    setState: {
      setData,
      setEdit,
      setFilter,
      setViewType,
      onShowSizeChange,
      onPageNumberChange,
      setPaginationOptions,
    },
    isEdit,
    handleOnAdd,
    handleRefresh,
    handleCreateEdit,
    onEditButtonClick,
    handleCloseDrawer,
  };
};

export default useCardTableToggle;
