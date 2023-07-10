# usePromise

Dá Subscribe e retorna o resultado de uma promise e quando o componente desmonta (unmount) também dá unsubscribe,
diminuindo assim o risco de Memory Leak. **Como useEffect que retorna o valor da Promise**

## Como usar

```tsx
const [value, error, loading] = usePromise(() => userService.get(), []);

return (
  <div>
    {loading ? 'Carregando' : ''}
    {value}
  </div>
);
```

## Setando um estado extra

Quando necessário setar um estado extra sempre verique a função **isSubscribe**, ele retornará se o componente ainda está
montado e assim evitará **Memory Leak**.

```tsx
const [other, setOther] = useState();
const [value, error, loading] = usePromise(async isSubscribe => {
  const result = await userService.get();
  if (isSubscribe()) {
    setOther(result.otherValue);
  }
  return result;
}, []);

return (
  <div>
    {loading ? 'Carregando' : ''}
    {value}
  </div>
);
```

## Cuidados

- O valor inicial será **undefined**, lembre-se de tratar isso quando estiver usando.

## Parâmetros e Retorno

```ts
/**
 * @param promiseGenerator Função que retorna uma Promise
 * @param deps Lista de dependências
 * @returns [
 *    value: valor de retorno do Promise,
 *    error: se ocorrer um erro, ele será passado aqui,
 *    loading: boolean se esta carregando ou não
 * ]
 */
export default usePromise<T>(promiseGenerator: () => Promise<any>, deps: React.DependencyList): [T, any, boolean];
```
