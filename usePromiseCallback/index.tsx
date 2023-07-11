import { DependencyList, useRef, useEffect, useCallback } from 'react';

type OmitIsSubscribedArg<F> = F extends (s: any, ...args: infer P) => infer R ? (...args: P) => R : never;

let callCounter = 0;

/**
 * Return a callback, the promise value and unsubscribed if component unmount
 * @param promiseCallback
 * @param deps
 * @returns function
 */
export default function usePromiseCallback<F extends (isSubscribed: () => boolean, ...args: any[]) => Promise<any>>(
  promiseCallback: F,
  deps: DependencyList
): (...a: Parameters<OmitIsSubscribedArg<F>>) => ReturnType<F> {
  const isMounted = useRef(true);
  const lastCall = useRef<number>();

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback<any>((...args: Parameters<OmitIsSubscribedArg<F>>) => {
    const currentCall = ++callCounter;
    lastCall.current = currentCall;

    const promise = promiseCallback(
      () => {
        return isMounted.current && lastCall.current === currentCall;
      },
      ...args
    );

    return promise;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
