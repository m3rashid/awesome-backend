import { useEffect, useState } from 'react';

export type Person = {
  id: string;
  name: string;
  age: number;
};

export const sayHello = (p: Person) => {
  console.log(`Hello ${p.name}`);
};

export const usePerson = () => {
  const [p, setP] = useState<Person | null>(null);

  useEffect(() => {
    console.log('usePerson');
  }, [p?.name]);

  const setPerson = (name: string) => {
    setP({ id: '1', name, age: 20 });
  };

  return {
    p,
    setP,
    setPerson,
  };
};
