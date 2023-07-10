import { DependencyList, useCallback, useState } from 'react';

import usePromise from '../usePromise';

/**
 * Return the promise value and unsubscribed if component unmount
 * @param promiseGenerator
 * @param deps
 * @returns [value, error, loading, refresh]
 */
export default function usePromiseRefresh<T>(
  promiseGenerator: (isSubscribed: () => boolean) => Promise<T>,
  deps: DependencyList
): [T | undefined, any, boolean, () => void] {
  const [refresh, setRefresh] = useState<number>();

  const [data, error, loading] = usePromise(promiseGenerator, [refresh, ...deps]);

  const onRetry = useCallback(() => setRefresh(Date.now()), []);

  return [data, error, loading, onRetry];
}
