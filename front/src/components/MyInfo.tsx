import React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { MYPAGE, USER } from "../api/url";
import { bold, Flex, mainTheme, maxWidth, Span, subTheme, Cancel } from "../styled";
import { success_notify, warning_notify } from "../ts/export";

interface IInfo {
  setOpen: (ele: boolean) => void;
}

interface IForm {
  id: string,
  email: string,
  nickname: string,
  gender: number,
}

interface IBool {
  id: boolean,
  email: boolean,
  nickname: boolean,
  gender: boolean,
}

export const MyInfo = ({ setOpen }: IInfo) => {
  const idRef = useRef<any>(null)
  const emailRef = useRef<any>(null)
  const nicknameRef = useRef<any>(null)
  const [isData, setIsData] = useState<IForm>({ id: '', email: '', nickname: '', gender: 1 })
  const [isFocus, setIsFocus] = useState<IBool>({ id: false, email: false, nickname: false, gender: false })
  const [isAlert, setIsAlert] = useState<IBool>({ id: false, email: false, nickname: false, gender: false })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await Axios.get(`${MYPAGE}/info`)
    setIsData(data.data[0])
    console.log(data.data[0])
  }

  const idClick = () => {
    idRef.current.focus();
    setIsFocus({ id: true, email: false, nickname: false, gender: false })
  }

  const emailClick = () => {
    emailRef.current.focus();
    setIsFocus({ id: false, email: true, nickname: false, gender: false })
  }

  const nicknameClick = () => {
    nicknameRef.current.focus();
    setIsFocus({ id: false, email: false, nickname: true, gender: false })
  }

  const idBlur = () => {
    if (isData.id === '') setIsAlert(ele => ({ ...ele, id: true }))
    else setIsAlert(ele => ({ ...ele, id: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false })
  }

  const emailBlur = () => {
    if (isData.email === '') setIsAlert(ele => ({ ...ele, email: true }))
    else setIsAlert(ele => ({ ...ele, email: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false })
  }

  const nicknameBlur = () => {
    if (isData.nickname === '') setIsAlert(ele => ({ ...ele, nickname: true }))
    else setIsAlert(ele => ({ ...ele, nickname: false }))
    setIsFocus({ id: false, email: false, nickname: false, gender: false })
  }

  const editBtn = async () => {
    if (Object.values(isAlert).some(item => !item)) {
      const request = { ...isData, gender: Number(isData.gender) }
      const { data } = await Axios.patch(`${USER}/update`, request)

      if (!data.result) {
        warning_notify(data.message)
        setIsAlert(ele => ({ ...ele, id: true }))
      }
      else {
        success_notify('정보 수정이 되었습니다.')
        setOpen(false)
      }
    }
  }

  return (
    <Background onClick={() => setOpen(false)}>
      <Modal onClick={(e: any) => e.stopPropagation()}>
        {/* 아이디 */}
        <InputContainer onBlur={idBlur} onClick={idClick} click={isFocus.id}>
          <Text click={isFocus.id}>아이디</Text>
          <Input value={isData.id} ref={idRef} width={maxWidth} readOnly />
        </InputContainer>
        {/* 이메일 */}
        <InputContainer onBlur={emailBlur} onClick={emailClick} click={isFocus.email} alert={isAlert.email}>
          <Text click={isFocus.email} alert={isAlert.email}>이메일</Text>
          <Input value={isData.email} onChange={(e: any) => setIsData(ele => ({ ...ele, email: e.target.value }))} ref={emailRef} width={maxWidth} />
        </InputContainer>
        {/* 닉네임 */}
        <InputContainer onBlur={nicknameBlur} onClick={nicknameClick} click={isFocus.nickname} alert={isAlert.nickname}>
          <Text click={isFocus.nickname} alert={isAlert.nickname}>닉네임</Text>
          <Input value={isData.nickname} onChange={(e: any) => setIsData(ele => ({ ...ele, nickname: e.target.value }))} ref={nicknameRef} width={maxWidth} />
        </InputContainer>
        {/* 성별 */}
        <InputContainer click={isFocus.gender} alert={isAlert.gender}>
          <Text click={isFocus.gender} alert={isAlert.gender}>성별</Text>
          <Flex justify="flex-end" style={{ margin: '0 32px 0 0' }}>
            <Label>
              <Radio name="gender" type={'radio'} defaultChecked={isData.gender === 1} value={1} onChange={(e: any) => setIsData(ele => ({ ...ele, gender: e.target.value }))} />
              <Span style={{ verticalAlign: 'middle', display: 'inline-block', marginTop: '4px' }}>남자</Span>
            </Label>
            <Label>
              <Radio name="gender" type={'radio'} defaultChecked={isData.gender === 2} value={2} onChange={(e: any) => setIsData(ele => ({ ...ele, gender: e.target.value }))} />
              <Span style={{ verticalAlign: 'middle', display: 'inline-block', marginTop: '4px' }}>여자</Span>
            </Label>
          </Flex>
        </InputContainer>
        <Flex justify="center" align="center" style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translate(-50%, 0)' }}>
          <Button onClick={editBtn}>정보 수정</Button>
          <CancelBtn justify="center" align="center" onClick={() => setOpen(false)}>
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

const InputContainer = styled.div<{ click: boolean, alert?: boolean }>`
  position: relative;
  width: 100%;
  border: ${props => props.click ? `2px solid ${mainTheme}` : props.alert ? '2px solid #ff0000' : `1px solid ${subTheme}`};
  /* border: 1px solid ${subTheme}; */
  border-radius: 12px;
  min-height: 72px;
  margin-bottom: 16px;
`

const Text = styled.div<{ click: boolean, alert?: boolean }>`
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