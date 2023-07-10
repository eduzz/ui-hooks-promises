import { DependencyList, useState, useEffect } from 'react';

/**
 * Return the promise value and unsubscribed if component unmount
 * @param promiseGenerator
 * @param deps
 * @returns [value, error, loading]
 */
export default function usePromise<T>(
  promiseGenerator: (isSubscribed: () => boolean) => Promise<T>,
  deps: DependencyList
): [T | undefined, any, boolean] {
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<T | undefined>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    setError(undefined);

    promiseGenerator(() => isSubscribed)
      .then(result => {
        if (!isSubscribed) return;
        setResult(() => result);
      })
      .catch(err => {
        if (!isSubscribed) return;
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [result, error, loading];
}
