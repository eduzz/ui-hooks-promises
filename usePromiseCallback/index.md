# usePromiseCallback

Retorn um callback que dará Subscribe e retornará o resultado de uma promise e quando o componente desmonta (unmount) também dá
unsubscribe, diminuindo assim o risco de Memory Leak. **Como useEffect que retorna o valor da Promise**

## Como usar

```tsx
const [loading, setLoading] = useState();
const callback = usePromiseCallback(async isSubscribe => {
  setLoading(true);
  await userService.get();
  // Se for setar um estado sempre verifique o isSubscribe, para evitar Memory Leak, e subsequentes chamadas
  // farão que chamadas anteriores não alterem estados.
  if (isSubscribe()) setLoading(false);
}, []);

return (
  <div>
    {loading ? 'Carregando' : ''}
    <button onClick={callback}>iniciar</button>
  </div>
);
```

## Parâmetros e Retorno

```ts
/**
 * @param promiseCallback Função que retorna uma Promise, pode receber parametros
 * @param deps Lista de dependências
 * @returns [
 *    callback: callback para iniciar a promise,
 *    value: valor de retorno do Promise,
 *    error: se ocorrer um erro, ele será passado aqui,
 *    loading: boolean se esta carregando ou não
 * ]
 */
export default function usePromiseCallback<T, F extends (...args: any[]) => Promise<T>>(
  promiseCallback: F,
  deps: React.DependencyList
): [(...a: Parameters<F>) => Promise<T>, T, any, boolean];
```
