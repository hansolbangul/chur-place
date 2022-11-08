import React, { useState } from "react";
import styled from "styled-components";
import { DocumentAdd, Flex, Plus } from "../styled";

export const CatImage = () => {
  const [test, setTest] = useState(false)
  return (
    <Column>
      <SubTitle>
        이미지 등록
      </SubTitle>
      <Form>
        <AddForm onClick={() => setTest(item => !item)} ><Plus fontSize={18} />이미지 추가</AddForm>
        <ImageForm>
          {new Array(12).fill('이미지').map((item, index) => <ImageList key={index}><DocumentAdd fontSize={18} />{item}</ImageList>)}
        </ImageForm>
      </Form>
    </Column>
  )
}

const Column = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Form = styled(Flex)`
  width: 100%;
  justify-content: center;

`

const SubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`

const ImageForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 130px;
  flex: 1 1 auto;
  margin-right: 20px;
  overflow: scroll;
`

const ImageList = styled.div<{ circle?: boolean }>`
  display: flex;
  column-gap: 4px;
  align-items: center;
  padding: 6px 12px;
  /* border-bottom: 1px solid gray; */
`

const AddForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid gray;
  margin-left: 20px;
  width: 100px;

  transition: all .4s ease-in;
`