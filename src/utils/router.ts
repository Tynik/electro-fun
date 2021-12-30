export const useQueryParams = (): Record<string, any> => {
  const params = new URLSearchParams(
    window ? window.location.search : {}
  );

  return new Proxy(params, {
    get: (target, prop: string) => target.get(prop),
  });
}
