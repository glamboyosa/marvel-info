import {TCharacters} from '../types/characters';
import {TComics} from '../types/comics';
import md5 from 'blueimp-md5';
const getHeroesSSR = async (
  apiKey: string,
  privateApiKey: string,
  offset: string = '0',
) => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${privateApiKey}${apiKey}`);
  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&ts=${timeStamp}&apikey=${apiKey}&hash=${hash}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const resp: TCharacters = await response.json();

  return resp;
};
const getHeroes = async (
  apiKey: string,
  offset: string = '0',
  startsWith?: string,
): Promise<TCharacters> => {
  const response = await fetch(
    !startsWith
      ? `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&apikey=${apiKey}`
      : `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${startsWith}&limit=20&offset=${offset}&apikey=${apiKey}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const resp: TCharacters = await response.json();

  return resp;
};

const getHeroesComics = async (apiKey: string, heroId: string): Promise<TComics> => {
  const response = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${heroId}/comics?limit=100&apikey=${apiKey}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const resp: TComics = await response.json();

  return resp;
};
export {getHeroes, getHeroesSSR, getHeroesComics};
