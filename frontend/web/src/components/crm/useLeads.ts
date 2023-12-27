import { PaginatedResponse } from '@awesome/shared/types/base';
import { Lead, leadStatus } from '@awesome/shared/types/crm';
import { atom, useRecoilState } from 'recoil';
import { BoardItems } from './board';
import { service } from '@awesome/shared-web/utils/service';

export const leadsModalAtom = atom({
  key: 'leadsModalAtom',
  default: false,
});

const defaultBoardItems = leadStatus.reduce<BoardItems>(
  (acc, status) => ({ ...acc, [status]: [] }),
  {} as BoardItems
);

export const leadsAtom = atom<BoardItems>({
  key: 'leadsAtom',
  default: defaultBoardItems,
});

const useLeads = () => {
  const [addEditModalOpen, setAddEditModalOpen] =
    useRecoilState(leadsModalAtom);
  const [items, setItems] = useRecoilState(leadsAtom);

  const getLeads = async () => {
    const { data } = await service<PaginatedResponse<Lead>>('/api/crm/leads', {
      method: 'POST',
    })({ data: { searchCriteria: {} } });

    const filtered = data.docs.reduce<BoardItems>(
      (acc, lead) => ({ ...acc, [lead.status]: [...acc[lead.status], lead] }),
      defaultBoardItems
    );
    setItems(filtered);
  };

  return {
    items,
    setItems,
    getLeads,
    addEditModalOpen,
    setAddEditModalOpen,
  };
};

export default useLeads;
