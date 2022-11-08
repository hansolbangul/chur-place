import React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { bold, Div, Flex, mainTheme, maxWidth, subTheme } from "../styled";

interface IJoin {
  setOpen: (ele: boolean) => void;
}

export const Join = ({ setOpen }: IJoin) => {
  const idRef = useRef<any>(null)
  const emailRef = useRef<any>(null)
  const nicknameRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)
  const passwordConfirmRef = useRef<any>(null)
  const [joinData, setJoinData] = useState<{ id: string, email: string, nickname: string, password: string, passwordConfirm: string }>({ id: '', email: '', nickname: '', password: '', passwordConfirm: '' })
  const [isFocus, setIsFocus] = useState<{ id: boolean, email: boolean, nickname: boolean, password: boolean, passwordConfirm: boolean }>({ id: false, email: false, nickname: false, password: false, passwordConfirm: false })
  const [isAlert, setIsAlert] = useState<{ id: boolean, email: boolean, nickname: boolean, password: boolean, passwordConfirm: boolean }>({ id: false, email: false, nickname: false, password: false, passwordConfirm: false })

  useEffect(() => {
    idClick()
  }, [])

  const idClick = () => {
    idRef.current.focus();
    setIsFocus({ id: true, email: false, nickname: false, password: false, passwordConfirm: false })
  }

  const emailClick = () => {
    emailRef.current.focus();
    setIsFocus({ id: false, email: true, nickname: false, password: false, passwordConfirm: false })
  }

  const nicknameClick = () => {
    nicknameRef.current.focus();
    setIsFocus({ id: false, email: false, nickname: true, password: false, passwordConfirm: false })
  }

  const passwordClick = () => {
    passwordRef.current.focus();
    setIsFocus({ id: false, email: false, nickname: false, password: true, passwordConfirm: false })
  }

  const passwordConfirmClick = () => {
    passwordConfirmRef.current.focus();
    setIsFocus({ id: false, email: false, nickname: false, password: false, passwordConfirm: true })
  }

  const idBlur = () => {
    if (joinData.id === '') setIsAlert(ele => ({ ...ele, id: true }))
    else setIsAlert(ele => ({ ...ele, id: false }))
    setIsFocus({ id: false, email: false, nickname: false, password: false, passwordConfirm: false })
  }

  const emailBlur = () => {
    if (joinData.email === '') setIsAlert(ele => ({ ...ele, email: true }))
    else setIsAlert(ele => ({ ...ele, email: false }))
    setIsFocus({ id: false, email: false, nickname: false, password: false, passwordConfirm: false })
  }

  const nicknameBlur = () => {
    if (joinData.nickname === '') setIsAlert(ele => ({ ...ele, nickname: true }))
    else setIsAlert(ele => ({ ...ele, nickname: false }))
    setIsFocus({ id: false, email: false, nickname: false, password: false, passwordConfirm: false })
  }

  const passwordBlur = () => {
    if (joinData.password === '') setIsAlert(ele => ({ ...ele, password: true }))
    else setIsAlert(ele => ({ ...ele, password: false }))
    setIsFocus({ id: false, email: false, nickname: false, password: false, passwordConfirm: false })
  }

  const passwordConfirmBlur = () => {
    if (joinData.passwordConfirm === '') setIsAlert(ele => ({ ...ele, passwordConfirm: true }))
    else setIsAlert(ele => ({ ...ele, passwordConfirm: false }))
    setIsFocus({ id: false, email: false, nickname: false, password: false, passwordConfirm: false })
  }

  useEffect(() => {
    if (joinData.password !== joinData.passwordConfirm && joinData.passwordConfirm !== '') setIsAlert(ele => ({ ...ele, passwordConfirm: true }))
    else setIsAlert(ele => ({ ...ele, passwordConfirm: false }))
  }, [joinData.password, joinData.passwordConfirm])

  const joinBtn = () => {
    // TODO api connect

  }

  return (
    <Background onClick={() => setOpen(false)}>
      <Modal onClick={(e: any) => e.stopPropagation()} width={maxWidth}>
        {/* 아이디 */}
        <InputContainer onBlur={idBlur} onClick={idClick} click={isFocus.id} alert={isAlert.id}>
          <Text>ID</Text>
          <Input value={joinData.id} onChange={(e: any) => setJoinData(ele => ({ ...ele, id: e.target.value }))} ref={idRef} width={maxWidth} />
        </InputContainer>
        {/* 이메일 */}
        <InputContainer onBlur={emailBlur} onClick={emailClick} click={isFocus.email} alert={isAlert.email}>
          <Text>Email</Text>
          <Input value={joinData.email} onChange={(e: any) => setJoinData(ele => ({ ...ele, email: e.target.value }))} ref={emailRef} width={maxWidth} />
        </InputContainer>
        {/* 닉네임 */}
        <InputContainer onBlur={nicknameBlur} onClick={nicknameClick} click={isFocus.nickname} alert={isAlert.nickname}>
          <Text>Nickname</Text>
          <Input value={joinData.nickname} onChange={(e: any) => setJoinData(ele => ({ ...ele, nickname: e.target.value }))} ref={nicknameRef} width={maxWidth} />
        </InputContainer>
        {/* 비밀번호 */}
        <InputContainer onBlur={passwordBlur} onClick={passwordClick} click={isFocus.password} alert={isAlert.password}>
          <Text>Password</Text>
          <Input value={joinData.password} onChange={(e: any) => setJoinData(ele => ({ ...ele, password: e.target.value }))} ref={passwordRef} width={maxWidth} type='password' />
        </InputContainer>
        {/* 비밀번호 확인 */}
        <InputContainer onBlur={passwordConfirmBlur} onClick={passwordConfirmClick} click={isFocus.passwordConfirm} alert={isAlert.passwordConfirm}>
          <Text>Password Confirm</Text>
          <Input value={joinData.passwordConfirm} onChange={(e: any) => setJoinData(ele => ({ ...ele, passwordConfirm: e.target.value }))} ref={passwordConfirmRef} width={maxWidth} type='password' />
        </InputContainer>
        <Flex justify="center" align="center" style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
          <Button onClick={joinBtn}>Join</Button>
          <Div onClick={() => setOpen(false)} style={{ lineHeight: '48px', width: '52px', height: '48px', border: 'none', borderRadius: '12px', backgroundColor: '#000', color: '#fff' }}>X</Div>
        </Flex>
      </Modal>
    </Background>
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
  left: 40px;
  /* font-family: ${bold}; */
`

const Input = styled.input<{ width: number }>`
  outline: none;
  width: calc(100% - 80px);
  position: absolute;
  top: 40px;
  left: 40px;
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