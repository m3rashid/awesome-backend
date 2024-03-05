import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { Tenant } from '@awesome/shared/types/host';
import Loader from '@awesome/shared/components/loader';
import useLoading from '@awesome/shared/hooks/loading';
import { service } from '@awesome/shared/utils/service';
import PageContainer from '../components/pageContainer';
import { useAuthValue } from '@awesome/shared/atoms/auth';
import CreateTenantForm from '../components/createTenantForm';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { loading, start, stop } = useLoading();
  const [tenantDetails, setTenantDetails] = useState<Tenant | null>(null);
  const auth = useAuthValue();

  const getTenantDetails = async () => {
    try {
      start('createTenant');
      const { data } = await service('/api/host/get', { method: 'POST' })({
        data: { searchCriteria: { tenantOwnerId: auth?.user?.id } },
      });
      setTenantDetails(data);
    } catch (err) {
      console.log(err);
    } finally {
      stop('createTenant');
    }
  };

  useEffect(() => {
    getTenantDetails();
  }, []);

  return (
    <PageContainer>
      {loading ? (
        <Loader />
      ) : tenantDetails ? (
        <div>{JSON.stringify({ tenantDetails, auth })}</div>
      ) : (
        <div className='h-[calc(100vh-102px)] w-screen all-center'>
          <CreateTenantForm onSuccess={getTenantDetails} />
        </div>
      )}
    </PageContainer>
  );
};

export default Home;
