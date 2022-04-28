import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Error = FetchBaseQueryError | SerializedError | undefined;

export const usePageErrorHandler = (error: Error) => {
  const { push } = useRouter();

  // <in> check is required for correctly inferring the error type
  const is404 = error && 'status' in error && error.status === 404;

  // Ensures push method gets called only after component has mounted
  useEffect(() => {
    if (is404) {
      push('/404');
    }
  }, [is404, push]);

  if (error && !is404) {
    return true;
  }

  return false;
};
