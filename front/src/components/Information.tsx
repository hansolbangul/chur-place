import React from "react";
import styled from "styled-components";
import { IModalOpen } from "../ts/interface";

export const Information = ({ modal, setModal }: IModalOpen) => {

  return (
    <Info onClick={() => setModal({ ...modal, info: false })}>

    </Info>
  )
}


const Info = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
  top: 0;
  left: 0;
  z-index: 9999;
`