import { DependencyList, useEffect } from 'react';

/**
 * Return the promise value and unsubscribed if component unmount
 * @param promiseGenerator
 * @param deps
 * @returns undefined
 */
export default function usePromiseEffect<T>(
  promiseGenerator: (isSubscribed: () => boolean) => Promise<T>,
  deps: DependencyList
): void {
  useEffect(() => {
    let isSubscribed = true;

    promiseGenerator(() => isSubscribed);

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
