import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  justify-content: center;
  padding: 1.5rem 3rem;
  background-color: var(--marvel-red);
  border: none;
  width: auto;
  font-family: inherit;
  position: relative;
  color: var(--white);
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 1.5rem;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom: 1.5rem solid var(--white);
    border-left: 1.5rem solid var(--marvel-red);
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top: 1.5rem solid var(--white);
    border-right: 1.5rem solid var(--marvel-red);
  }
`;

export {Button};
