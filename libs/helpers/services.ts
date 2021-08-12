import {TCharacters} from '../types/characters';
const getHeroes = async (apiKey: string, offset: string = '0'): Promise<TCharacters> => {
  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&apikey=${apiKey}
`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const resp: TCharacters = await response.json();

  return resp;
};
export {getHeroes};
