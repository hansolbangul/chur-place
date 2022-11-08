import React from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLoginAtom } from "../atoms";
import { bold, Div, Flex, Hamburger, mainTheme, Question } from "../styled";
import { IHeader } from "../ts/interface";
import { Join } from "./Join";
import { Login } from "./Login";
import { LoginForm } from "./LoginForm";

export const Header = ({ menuOpen, setMenuOpen }: IHeader) => {
  const [useInfo, setUseInfo] = useState<boolean>(false)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [joinOpen, setJoinOpen] = useState<boolean>(false)
  // const isLogin = useRecoilValue(isLoginAtom)

  const Information = () => {
    return (
      // TODO 스와이퍼
      <Info onClick={() => setUseInfo(false)} />
    )
  }

  const loginBtn = () => {
    // if (!isLogin) {
    setMenuOpen(false)
    setLoginOpen(true)
    // } else {

    // }
  }

  const myPageBtn = () => {

  }

  return (
    <>
      <LoginForm loginOpen={loginOpen} joinOpen={joinOpen} setLoginOpen={setLoginOpen} setJoinOpen={setJoinOpen} />
      <Container justify="space-between" align="center">
        {useInfo && <Information />}
        <Div style={{ position: 'relative' }}>
          <Circle onClick={() => setMenuOpen((ele: boolean) => !ele)} justify="center" align="center">
            <Hamburger fontSize={24} />
          </Circle>
          {menuOpen && <Menu onClick={loginBtn}>로그인하기</Menu>}
          {/* {menuOpen && <Menu onClick={myPageBtn}>마이페이지</Menu>} */}
          {/* {menuOpen ? !isLogin ? <Menu onClick={loginClick}>로그인하기</Menu> : <Menu>마이페이지</Menu> : null} */}
        </Div>
        <Circle onClick={() => setUseInfo(true)} justify="center" align="center">
          <Question fontSize={30} />
        </Circle>
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

const Info = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
  top: 0;
  left: 0;
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