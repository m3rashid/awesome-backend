import React from 'react';
import { useParams } from 'react-router-dom';

const SingleForm: React.FC = () => {
  const params = useParams();

  console.log(params.formId);

  return (
    <>
      <div>SingleForm</div>
    </>
  );
};

export default SingleForm;
