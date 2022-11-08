import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components'
import { Cancel, Flex, Img, maxWidth, Plus } from "../styled";
import { IGetLocation, ILatLon } from "../ts/interface";
import { defaultImage } from "../ts/export";
import { ViewModal } from "./ViewModal";

interface IModal {
  modalInfo: ILatLon | naver.maps.LatLng;
  viewInfo: IGetLocation | null;
  setViewInfo: (item: IGetLocation | null) => void;
  map: any;
  setMarker: (value: any) => void
}

export const InitModal = ({ modalInfo, viewInfo, setViewInfo, map, setMarker }: IModal) => {
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    if (viewInfo) setModal(true)
  }, [viewInfo])

  useEffect(() => {
    if (modalInfo) setModal(false)
  }, [modalInfo])

  const viewModal = useCallback(() => {
    return (
      <>
        <Footer hidden={modal} onClick={() => setModal(true)}>
          <Plus color="#fff" fontSize={32} />
        </Footer>
        <Modal visible={modal} maxHeight={600}>
          {/* <Modal visible={modal}> */}
          <ViewModal modal={modal} viewInfo={viewInfo} modalInfo={modalInfo} setViewInfo={setViewInfo} setModal={setModal} map={map} setMarker={setMarker} />
        </Modal>
      </>
    )
  }, [modal, modalInfo, viewInfo])

  return (
    <>{viewModal()}</>
  )
}

const Footer = styled.div<{ hidden: boolean }>`
  position: absolute;
  visibility: ${props => props.hidden ? 'hidden' : 'visible'};
  bottom: 40px;
  right: 20px;
  width: 70px;
  height: 70px;
  background-color: #FF7B54;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div<{ maxHeight?: number, visible: boolean }>`
  position: absolute;
  bottom: ${props => props.visible ? 30 : -850}px;
  width: ${maxWidth < 500 ? maxWidth - 50 : 450}px;
  max-height: ${props => props.maxHeight}px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;

  transition: .5s all ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`