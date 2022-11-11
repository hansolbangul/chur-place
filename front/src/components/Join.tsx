import React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { bold, Flex, mainTheme, maxWidth, Span, subTheme, Cancel } from "../styled";
import { success_notify, warning_notify } from "../ts/export";
import { IModalOpen } from "../ts/interface";

interface IForm {
  id: string,
  email: string,
  nickname: string,
  gender: number,
  password: string,
  passwordConfirm?: string
}

interface IBool {
  id: boolean,
  email: boolean,
  nickname: boolean,
  gender: boolean,
  password: boolean,
  passwordConfirm: boolean
}

export const Join = ({ modal, setModal }: IModalOpen) => {
  const idRef = useRef<any>(null)
  const emailRef = useRef<any>(null)
  const nicknameRef = useRef<any>(null)
  const passwordRef = useRef<any>(null)
  const passwordConfirmRef = useRef<any>(null)
  const [joinData, setJoinData] = useState<IForm>({ id: '', email: '', nickname: '', gender: 1, password: '', passwordConfirm: '' })
  const [isFocus, setIsFocus] = useState<IBool>({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })
  const [isAlert, setIsAlert] = useState<IBool>({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })

  useEffect(() => {
    idClick()
  }, [])

  const idClick = () => {
    idRef.current.focus();
    setIsFocus({ id: true, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })
  }

  const emailClick = () => {
    emailRef.current.focus();
    setIsFocus({ id: false, email: true, nickname: false, gender: false, password: false, passwordConfirm: false })
  }

  const nicknameClick = () => {
    nicknameRef.current.focus();
    setIsFocus({ id: false, email: false, nickname: true, gender: false, password: false, passwordConfirm: false })
  }

  const passwordClick = () => {
    passwordRef.current.focus();
    setIsFocus({ id: false, email: false, nickname: false, gender: false, password: true, passwordConfirm: false })
  }

  const passwordConfirmClick = () => {
    passwordConfirmRef.current.focus();
    setIsFocus({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: true })
  }

  const idBlur = () => {
    if (joinData.id === '') setIsAlert(ele => ({ ...ele, id: true }))
    else setIsAlert(ele => ({ ...ele, id: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })
  }

  const emailBlur = () => {
    if (joinData.email === '') setIsAlert(ele => ({ ...ele, email: true }))
    else setIsAlert(ele => ({ ...ele, email: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })
  }

  const nicknameBlur = () => {
    if (joinData.nickname === '') setIsAlert(ele => ({ ...ele, nickname: true }))
    else setIsAlert(ele => ({ ...ele, nickname: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })
  }

  const passwordBlur = () => {
    if (joinData.password === '') setIsAlert(ele => ({ ...ele, password: true }))
    else setIsAlert(ele => ({ ...ele, password: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })
  }

  const passwordConfirmBlur = () => {
    if (joinData.passwordConfirm === '') setIsAlert(ele => ({ ...ele, passwordConfirm: true }))
    else setIsAlert(ele => ({ ...ele, passwordConfirm: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false, password: false, passwordConfirm: false })
  }

  useEffect(() => {
    if (joinData.password !== joinData.passwordConfirm && joinData.passwordConfirm !== '') {
      setIsAlert(ele => ({ ...ele, passwordConfirm: true }))
      warning_notify('비밀번호가 일치하지 않습니다.')
    }
    else setIsAlert(ele => ({ ...ele, passwordConfirm: false }))
  }, [joinData.password, joinData.passwordConfirm])

  const joinBtn = async () => {
    if (Object.values(isAlert).some(item => !item)) {
      const request = { ...joinData, gender: Number(joinData.gender) }
      delete request.passwordConfirm
      const { data } = await Axios.post('/user/join', joinData)

      if (!data.result) {
        warning_notify(data.message)
        setIsAlert(ele => ({ ...ele, id: true }))
      }
      else {
        success_notify('회원가입에 성공하셨습니다')
        setModal({ ...modal, join: false })
      }
    } else {
      warning_notify('필수값을 입력해주세요!')
    }
  }

  return (
    <Background onClick={() => setModal({ ...modal, join: false })}>
      <Modal onClick={(e: any) => e.stopPropagation()}>
        {/* 아이디 */}
        <InputContainer onBlur={idBlur} onClick={idClick} click={isFocus.id} alert={isAlert.id}>
          <Text click={isFocus.id} alert={isAlert.id}>아이디</Text>
          <Input value={joinData.id} onChange={(e: any) => setJoinData(ele => ({ ...ele, id: e.target.value }))} ref={idRef} width={maxWidth} />
        </InputContainer>
        {/* 이메일 */}
        <InputContainer onBlur={emailBlur} onClick={emailClick} click={isFocus.email} alert={isAlert.email}>
          <Text click={isFocus.email} alert={isAlert.email}>이메일</Text>
          <Input value={joinData.email} onChange={(e: any) => setJoinData(ele => ({ ...ele, email: e.target.value }))} ref={emailRef} width={maxWidth} />
        </InputContainer>
        {/* 닉네임 */}
        <InputContainer onBlur={nicknameBlur} onClick={nicknameClick} click={isFocus.nickname} alert={isAlert.nickname}>
          <Text click={isFocus.nickname} alert={isAlert.nickname}>닉네임</Text>
          <Input value={joinData.nickname} onChange={(e: any) => setJoinData(ele => ({ ...ele, nickname: e.target.value }))} ref={nicknameRef} width={maxWidth} />
        </InputContainer>
        {/* 성별 */}
        <InputContainer click={isFocus.gender} alert={isAlert.gender}>
          <Text click={isFocus.gender} alert={isAlert.gender}>성별</Text>
          <Flex justify="flex-end" style={{ margin: '0 32px 0 0' }}>
            <Label>
              <Radio name="gender" defaultChecked type={'radio'} value={1} onChange={(e: any) => setJoinData(ele => ({ ...ele, gender: e.target.value }))} />
              <Span style={{ verticalAlign: 'middle', display: 'inline-block', marginTop: '4px' }}>남자</Span>
            </Label>
            <Label>
              <Radio name="gender" type={'radio'} value={2} onChange={(e: any) => setJoinData(ele => ({ ...ele, gender: e.target.value }))} />
              <Span style={{ verticalAlign: 'middle', display: 'inline-block', marginTop: '4px' }}>여자</Span>
            </Label>
          </Flex>
        </InputContainer>
        {/* 비밀번호 */}
        <InputContainer onBlur={passwordBlur} onClick={passwordClick} click={isFocus.password} alert={isAlert.password}>
          <Text click={isFocus.password} alert={isAlert.password}>비밀번호</Text>
          <Input value={joinData.password} onChange={(e: any) => setJoinData(ele => ({ ...ele, password: e.target.value }))} ref={passwordRef} width={maxWidth} type='password' />
        </InputContainer>
        {/* 비밀번호 확인 */}
        <InputContainer onBlur={passwordConfirmBlur} onClick={passwordConfirmClick} click={isFocus.passwordConfirm} alert={isAlert.passwordConfirm}>
          <Text click={isFocus.passwordConfirm} alert={isAlert.passwordConfirm}>비밀번호 확인</Text>
          <Input value={joinData.passwordConfirm} onChange={(e: any) => setJoinData(ele => ({ ...ele, passwordConfirm: e.target.value }))} ref={passwordConfirmRef} width={maxWidth} type='password' />
        </InputContainer>
        <Flex justify="center" align="center" style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
          <Button onClick={joinBtn}>회원가입</Button>
          <CancelBtn justify="center" align="center" onClick={() => setModal({ ...modal, join: false })}>
            <Cancel />
          </CancelBtn>
        </Flex>
      </Modal>
    </Background>
  )
}

const CancelBtn = styled(Flex)`
  width: 52px;
  height: 48px; 
  border: none;
  border-radius: 12px;
  background-color: #000;
`

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin: 24px 20px 0 0;
`

const Radio = styled.input`
  appearance: none;
  border-radius: 50px;
  width: 18px;
  height: 18px;
  border: 1px solid ${subTheme};
  margin-right: 8px;

  :checked {
    border: 5px solid ${mainTheme};
  }
  :focus-visible {
    outline-offset: 2px;
    outline: 2px dotted ${mainTheme};
  }
  :hover {
    box-shadow: 0 0 0 4px rgb(255, 123, 84, 0.2);
  }
`

const InputContainer = styled.div<{ click: boolean, alert: boolean }>`
  position: relative;
  width: 100%;
  border: ${props => props.click ? `2px solid ${mainTheme}` : props.alert ? '2px solid #ff0000' : `1px solid ${subTheme}`};
  /* border: 1px solid ${subTheme}; */
  border-radius: 12px;
  min-height: 72px;
  margin-bottom: 16px;
`

const Text = styled.div<{ click: boolean, alert: boolean }>`
  color: ${subTheme};
  /* color: ${props => props.click ? mainTheme : props.alert ? '#ff0000' : subTheme}; */
  font-size: 12px;
  position: absolute;
  top: 20px;
  left: 40px;
  /* font-family: ${props => props.click ? mainTheme : props.alert ? bold : 'inherit'}; */
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
  margin-right: 19px;
  width: 157px;
  border: none;
  border-radius: 12px;
  padding: 16px;
  background-color: ${mainTheme};
  box-shadow: 0px 4px 4px 1px rgba(0, 0, 0, 0.15);
  color: #fff;
  font-family: ${bold};
  font-size: 14px;
`

const Modal = styled.div`
  width: 284px;
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