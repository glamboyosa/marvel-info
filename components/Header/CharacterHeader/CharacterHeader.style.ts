import styled from 'styled-components';

const CharacterHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 60vh, 0 100%);
`;

const CharacterContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 0.5fr);
  margin-top: -10%;
  /* grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); */
`;

const CharacterImage = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 50%;
  align-self: center;
  justify-content: center;
`;

const CharacterTitle = styled.h1`
  color: var(--white);
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
  align-self: center;
  @media only screen and (max-width: 800px) {
    & {
      font-size: 2rem;
    }
  }
`;

export {CharacterContainer, CharacterHeader, CharacterImage, CharacterTitle};
