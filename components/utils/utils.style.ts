import styled, {keyframes} from 'styled-components';

const rotateKeyframes = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Container = styled.div`
  margin-left: 1.2rem;
  margin-right: 1.2rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const Loading = styled.div`
  font-size: 4rem;
  margin-right: 1.5rem;
  animation: ${rotateKeyframes} 2s linear infinite;
`;

const Line = styled.div`
  height: 0.2rem;
  width: 85%;
  margin-top: 2.5rem;
  background-color: var(--grey);
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--black-shade);
  margin-left: 6.5%;
  margin-top: 1rem;
  text-transform: uppercase;
`;

const CloseButton = styled.div`
  position: relative;
  background-color: transparent;
  margin-top: 2rem;
  grid-column: -1;
  &,
  &::before,
  &::after {
    width: 3rem;
    height: 3px;
    display: inline-block;
    cursor: pointer;
  }
  &::before,
  &::after {
    background-color: var(--black);
    content: '';
    position: absolute;
    left: 0;
  }
  &::before {
    transform: rotate(45deg);
    top: 0;
  }
  &::after {
    top: 0;
    transform: rotate(-45deg);
  }
`;
export {Center, Container, StyledLink, Loading, Line, Heading, CloseButton};
