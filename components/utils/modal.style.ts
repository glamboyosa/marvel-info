import styled, {css} from 'styled-components';
import {ModalProps} from '../../libs/types/modal';

const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 50%;
  height: 80vh;
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
  display: flex;
  justify-content: space-around;
`;

const ModalTitle = styled.h3`
  font-size: 2rem;
`;
const ModalDescritption = styled.div`
  font-size: 1.5rem;
`;

export {Modal, ModalContent, ModalTitle, ModalDescritption};
