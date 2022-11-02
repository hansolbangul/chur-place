import React from "react";
import styled from 'styled-components'
import { Flex, maxWidth } from "../styled";
import { BiX } from "react-icons/bi";

interface IModal {
  motion: number
  setModal: (item: boolean) => void
}

export const InitModal = ({ motion, setModal }: IModal) => {
  return (
    <Modal animation={motion}>
      {motion === 100 ? <></> : <Flex justify="flex-end" margin="10px">
        <Cancel onClick={() => setModal(false)} />
      </Flex>}

    </Modal>
  )
}

const Cancel = styled(BiX)`
  font-size: 35px;
  font-weight: bold;
`

const Modal = styled.div<{ animation: number }>`
  position: absolute;
  bottom: 0;
  width: ${maxWidth < 500 ? maxWidth : 500}px;
  height: ${props => props.animation}px;
  border-radius: 35px 35px 0 0;
  background-color: #fff;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;

  transition: .5s all ease;

  display: flex;
  flex-direction: column;
`