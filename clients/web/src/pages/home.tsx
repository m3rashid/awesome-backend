import { usePerson } from '@awesome/shared';
import React from 'react';

export type HomeProps = {
  //
};

const Home: React.FC<HomeProps> = () => {
  const { p } = usePerson();

  console.log(p);

  return (
    <>
      <div>Home</div>
    </>
  );
};

export default Home;
