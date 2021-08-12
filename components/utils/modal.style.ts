import styled, {css} from 'styled-components';
import {ModalProps} from '../../libs/types/modal';

const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 70%;
  padding: 1rem 3rem;
  height: 100vh;
  transition: all 0.2s;
  ${props =>
    props.showModal
      ? css`
          transform: translateX(0deg);
          visibility: visible;
        `
      : css`
          transform: translateX(100%);
          visibility: hidden;
        `}
  background-color: var(--white);
`;
const ModalContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
`;
const ModalContentDescritption = styled.div`
  font-size: 1.5rem;
`;
const ModalContentImage = styled.img`
  width: 90%;
`;
export {Modal, ModalContent, ModalTitle, ModalContentDescritption, ModalContentImage};
