import React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { bold, Div, Flex, LoginPassword, LoginUser, mainTheme, maxWidth, Span, subTheme } from "../styled";

interface ILogin {
  setOpen: (ele: boolean) => void;
  setNext: (ele: boolean) => void;
}

export const Login = ({ setOpen, setNext }: ILogin) => {
  const usernameRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)
  const [loginData, setLoginData] = useState<{ id: string, password: string }>({ id: '', password: '' })
  const [isFocus, setIsFocus] = useState<{ id: boolean, password: boolean }>({ id: false, password: false })
  const [isAlert, setIsAlert] = useState<{ id: boolean, password: boolean }>({ id: false, password: false })

  useEffect(() => {
    idClick()
  }, [])

  const idClick = () => {
    usernameRef.current.focus();
    setIsFocus({ id: true, password: false })
  }
  const passwordClick = () => {
    passwordRef.current.focus();
    setIsFocus({ id: false, password: true })
  }

  const idBlur = () => {
    if (loginData.id === '') setIsAlert(ele => ({ ...ele, id: true }))
    else setIsAlert(ele => ({ ...ele, id: false }))
    setIsFocus({ id: false, password: false })
  }

  const passwordBlur = () => {
    if (loginData.password === '') setIsAlert(ele => ({ ...ele, password: true }))
    else setIsAlert(ele => ({ ...ele, password: false }))
    setIsFocus({ id: false, password: false })
  }

  const loginBtn = () => {
    // TODO api connect
  }

  return (
    <Background onClick={() => setOpen(false)}>
      <Modal onClick={(e: any) => e.stopPropagation()} width={maxWidth}>
        <InputContainer onBlur={idBlur} onClick={idClick} click={isFocus.id} alert={isAlert.id}>
          <LoginUser style={{ position: 'absolute', top: '28px', left: '16px' }} fontSize={20} color={subTheme} />
          <Text>id</Text>
          <Input value={loginData.id} onChange={(e: any) => setLoginData({ id: e.target.value, password: loginData.password })} ref={usernameRef} width={maxWidth} />
        </InputContainer>
        <InputContainer onBlur={passwordBlur} onClick={passwordClick} click={isFocus.password} alert={isAlert.password}>
          <LoginPassword style={{ position: 'absolute', top: '28px', left: '16px' }} fontSize={18} color={subTheme} />
          <Text>Password</Text>
          <Input value={loginData.password} onChange={(e: any) => setLoginData({ id: loginData.id, password: e.target.value })} ref={passwordRef} width={maxWidth} type='password' />
        </InputContainer>
        <Flex justify="center" align="center" style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
          <Button onClick={loginBtn}>Login</Button>
          <Div onClick={() => setOpen(false)} style={{ lineHeight: '48px', width: '52px', height: '48px', border: 'none', borderRadius: '12px', backgroundColor: '#000', color: '#fff' }}>X</Div>
        </Flex>
        <Span onClick={() => { setNext(true); setOpen(false); }} style={{ color: subTheme, float: 'right' }}>회원가입</Span>
      </Modal>
    </Background >
  )
}

const InputContainer = styled.div<{ click: boolean, alert: boolean }>`
  position: relative;
  width: 100%;
  border: ${props => props.click ? `2px solid ${mainTheme}` : props.alert ? `2px solid red` : `1px solid ${subTheme}`};
  border-radius: 12px;
  min-height: 72px;
  margin-bottom: 16px;
`

const Text = styled.div`
  color: ${subTheme};
  font-size: 12px;
  position: absolute;
  top: 20px;
  left: 48px;
  /* font-family: ${bold}; */
`

const Input = styled.input<{ width: number }>`
  outline: none;
  width: calc(100% - 80px);
  position: absolute;
  top: 40px;
  left: 48px;
  font-size: 14px;
  border: none;
  `

const Button = styled.button`
  /* position: absolute; */
  margin-right: 19px;
  width: 157px;
  border: none;
  border-radius: 12px;
  padding: 16px;
  background-color: ${mainTheme};
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.15);
  color: #fff;
  /* bottom: -24px;
  left: 50%;
  transform: translate(-50%, 0); */
`

const Modal = styled.div<{ width: number }>`
  width: ${props => props.width > 500 ? '500px' : '284px'};
  background-color: #fff;
  border-radius: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 32px;
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.15);
`

const Background = styled.div`
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.25);
  top: 0;
  left: 0;
`