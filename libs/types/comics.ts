export type ComicResult = {
  id: number;
  title: string;
  description: string;
  thumbnail: {path: string; extension: string};
  creators: {name: string}[];
};

export type TComics = {
  code?: string;
  message?: string;
  data: {
    results: ComicResult[];
  };
};
