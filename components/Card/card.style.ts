import styled, {css} from 'styled-components';
import {CardProps} from '../../libs/types/card';
const CardsContainer = styled.main`
  margin-top: 2.5rem;
  display: grid;
  gap: 2rem;
  row-gap: 6rem;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
`;
const Card = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 0.8rem;
  width: auto;
  flex-direction: column;
  max-width: 50rem;
  height: 50rem;
  background-color: var(--white);
  box-shadow: 0.4rem 0.4rem 0.7rem var(--black);
  transition: all 0.3s;
  &:hover {
    transform: translateY(-3px);
  }
`;

const CardBottom = styled.div<CardProps>`
  display: flex;
  width: 100%;
  background-color: ${props => (props.home ? `var(--black)` : `var(--white)`)};
  align-items: center;
  position: relative;
  flex-direction: column;
  transition: all 0.2s;
  ${props =>
    props.home &&
    css`
      &:hover {
        background-color: var(--marvel-red);
      }
    `}
`;
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const CardTitle = styled.h3`
  font-size: 2.5rem;
  color: var(--white);
  font-weight: bold;
`;

const CardInfo = styled.p`
  font-size: 2rem;
  color: var(--white);
`;
const CardLine = styled.div`
  height: 0.5rem;
  width: auto;
  padding: 0.5rem;
  background-color: var(--marvel-red);
`;
export {Card, CardBottom, CardImage, CardInfo, CardTitle, CardsContainer, CardLine};
