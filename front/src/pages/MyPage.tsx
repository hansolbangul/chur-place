import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { MYPAGE } from "../api/url";
import { MyInfo } from "../components/MyInfo";
import { SaveComponent } from "../components/SaveComponent";
import { bold, Flex, mainTheme, maxWidth, Span } from "../styled";
import { IHeader } from "../ts/interface";

interface IData {
  member: string,
  heart: ICat[]
}

interface ICat {
  age: number,
  cat_id: number,
  create_date: string,
  gender: number,
  type: string
}

export const MyPage = ({ menuOpen, setMenuOpen }: IHeader) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isData, setIsData] = useState<IData>({ member: '', heart: [] })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await Axios.get(MYPAGE)
    setIsData(data.data)
  }

  return (
    <Container>
      {isOpen && <MyInfo setOpen={setIsOpen} />}
      <Flex style={{ marginBottom: '16px' }} justify="space-between" align="center">
        <Title>{isData.member} 님</Title>
        <Span onClick={() => setIsOpen(true)} style={{ margin: '0 32px', color: mainTheme, fontSize: '14px' }}>정보 수정</Span>
      </Flex>
      <Title>내가 저장한 고양이</Title>
      <SaveComponent item={isData.heart} />
    </Container>
  )
}

const Container = styled.div`
  width: ${maxWidth < 500 ? 'inherit' : '500px'};
  padding: 140px  0;
  /* padding: 140px 32px 0; */
  min-height: 100vh;
  margin: auto;
`


const Title = styled.div`
  font-family: ${bold};
  font-size: 20px;
  margin: 0 0 16px 32px;
`