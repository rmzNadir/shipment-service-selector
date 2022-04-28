import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Error = FetchBaseQueryError | SerializedError | undefined;

export const usePageErrorHandler = (error: Error) => {
  const { push } = useRouter();

  // <in> check is required for correctly inferring the error type
  const is404 = error && 'status' in error && error.status === 404;
  const isAbortSignalError =
    error &&
    isSerializedError(error) &&
    error.message === 'Expected signal to be an instanceof AbortSignal';

  // Ensures push method gets called only after component has mounted
  useEffect(() => {
    if (is404) {
      push('/404');
    }
  }, [is404, push]);

  // Workaround for now is suppresing this error until vercel supports
  // newer Node versions https://github.com/vercel/community/discussions/37
  // TODO: Test deployment on another provider
  if (error && !is404 && !isAbortSignalError) {
    return true;
  }

  return false;
};

const isSerializedError = (error: Error): error is SerializedError =>
  !!error && 'message' in error;
