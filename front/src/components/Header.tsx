import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../atoms";
import { Back, Beaker, bold, Div, Flex, Hamburger, mainTheme, Question } from "../styled";
import { IHeader, IModal } from "../ts/interface";
import { ModalComponent } from "./ModalComponent";

export const Header = ({ menuOpen, setMenuOpen }: IHeader) => {
  const navigate = useNavigate()
  const isToken = useRecoilValue(isLoginAtom)
  const [modal, setModal] = useState<IModal>({ info: false, login: false, join: false, best: false })

  const loginBtn = () => {
    // if (!isLogin) {
    setMenuOpen(false)
    setModal({ ...modal, login: true })
    // } else {

    // }
  }

  const myPageBtn = () => {
    console.log('click')
    setMenuOpen(false)
    navigate('/mypage')
  }

  const menuBtn = () => {
    if (window.location.pathname === '/nmap') {
      setMenuOpen((ele: boolean) => !ele)
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <ModalComponent modal={modal} setModal={setModal} />
      <Container justify="space-between" align="center">
        <Div style={{ position: 'relative' }}>
          <Circle onClick={menuBtn} justify="center" align="center">
            {window.location.pathname === '/nmap' ? <Hamburger fontSize={24} /> : <Back />}
          </Circle>
          {menuOpen ? isToken === '' ? <Menu onClick={loginBtn}>로그인하기</Menu> : <Menu onClick={myPageBtn}>마이페이지</Menu> : null}
        </Div>
        <Circle onClick={() => setModal({ ...modal, info: true })} justify="center" align="center">
          <Question fontSize={30} />
        </Circle>
        <Container style={{ marginTop: '24px' }} justify="flex-end" align="center">
          <Circle onClick={() => setModal({ ...modal, best: true })} justify="center" align="center">
            <Beaker />
          </Circle>
        </Container>
      </Container>
    </>
  )
}

const Menu = styled.div`
  width: 80px;
  background-color: ${mainTheme};
  /* background-color: #fff; */
  /* color: #000; */
  /* color: ${mainTheme}; */
  color: #fff;
  font-family: ${bold};
  border-radius: 12px;
  position: absolute;
  top: 68px;
  left: 20px;
  padding: 15px 25px;
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.15);
  text-align: center;
  cursor: pointer;
`

const Container = styled(Flex)`
  width: 100%;
  position: absolute;
  top: 40px;
  z-index: 999;
`

const Circle = styled(Flex)`
  width: 48px;
  height: 48px;
  border-radius: 40px;
  background-color: #fff;
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.25);
  margin: 0 20px;
`