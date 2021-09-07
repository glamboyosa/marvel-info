export type ComicResult = {
  id: number;
  title: string;
  url: string;
  description: string;
  thumbnail: {path: string; extension: string};
  creators: {items: {name: string}[]};
};

export type TComics = {
  code?: string;
  message?: string;
  data: {
    results: ComicResult[];
  };
};
