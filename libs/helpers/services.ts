import {TCharacters} from '../types/characters';
import {TComics} from '../types/comics';
import md5 from 'js-md5';

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

const getHeroesComics = async (
  apiKey: string,
  heroId: string,
): Promise<TComics> => {

  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${heroId}/comics?limit=20&apiKey=${apiKey}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const resp: TComics = await response.json();

  return resp;
};
export {getHeroes, getHeroesComics};
