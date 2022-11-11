import React from "react";
import { IModalOpen } from "../ts/interface";
import { Information } from "./Information";
import { Join } from "./Join";
import { Login } from "./Login";

export const ModalComponent = ({ modal, setModal }: IModalOpen) => {

  return (
    <>
      {modal.login && <Login modal={modal} setModal={setModal} />}
      {modal.join && <Join modal={modal} setModal={setModal} />}
      {modal.info && <Information modal={modal} setModal={setModal} />}
    </>
  )
}