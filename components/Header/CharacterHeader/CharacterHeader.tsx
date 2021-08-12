import { characterHeaderProps } from '../../../libs/types/characterHeader';
import {
  CharacterContainer,
  CharacterHeader,
  CharacterImage,
  CharacterTitle
} from './CharacterHeader.style';

const CharactersHeader = ({characterTitle, characterImgURL}: characterHeaderProps) => (
  <CharacterHeader>
    <CharacterContainer>
      <CharacterTitle>{characterTitle}</CharacterTitle>
      <CharacterImage src={characterImgURL} />
    </CharacterContainer>
  </CharacterHeader>
);
export default CharactersHeader;
