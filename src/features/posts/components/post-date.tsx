'use client';

import { useEffect, useState } from 'react';

interface Props {
  createdAt: string;
}

export const PostDate = ({ createdAt }: Props) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date(createdAt).toLocaleString());
  }, [createdAt]);

  if (!date) {
    return null;
  }

  return <>{date}</>;
};

