# usePromiseRefresh

Um **usePromise** que retorna uma função de refresh para recarregar a promisse, útil na trativa de erros ou refresh.

## Como usar

```tsx
const [value, error, loading, refresh] = usePromiseRefresh(() => userService.get(), []);

return (
  <div>
    {loading ? 'Carregando' : ''}
    {value}
    <Button onClick={refresh} variant='text'>
      Reset
    </Button>
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
 *    loading: boolean se esta carregando ou não,
 *    refresh: function to refresh the data
 * ]
 */
export default usePromiseRefresh<T>(promiseGenerator: () => Promise<any>, deps: React.DependencyList): [T, any, boolean];
```
