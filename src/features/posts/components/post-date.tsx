'use client';

import { useEffect, useState } from 'react';

interface Props {
  createdAt: string;
}

export const PostDate = ({ createdAt }: Props) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: avoids hydration mismatch for locale-dependent date formatting
    setDate(new Date(createdAt).toLocaleString());
  }, [createdAt]);

  if (!date) {
    return null;
  }

  return <>{date}</>;
};

