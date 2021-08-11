function fetcher<json = any>(...args: [string]): Promise<json> {
  return fetch(...args, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
export {fetcher};
