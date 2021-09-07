import {result} from './characters';

export type SearchProps = {
  updateCharacters: (characters?: result[] | null) => void;
};
