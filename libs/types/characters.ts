export type result = {
  id: number;
  name: string;
  thumbnail: {path: string; extension: string};
  comics: {available: string};
};
export type TCharacters = {
  code?: string;
  message?: string;
  data: {
    results: result[];
  };
};
