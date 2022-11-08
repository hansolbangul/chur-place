import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { CAT } from "../api/url";
import { DocumentAdd, Flex, Plus } from "../styled";

interface IImages {
  // imageList: [File[]] | null,
  imageList: any,
  setImageList: (value: any) => void
}

export const CatImage = ({ imageList, setImageList }: IImages) => {
  const imageInput = useRef<HTMLInputElement>(null)

  const imageAdd = () => {
    if (imageInput.current) imageInput.current.click()
  }

  return (
    <Column>
      <SubTitle>
        이미지 등록
      </SubTitle>
      <Form>
        <AddForm onClick={imageAdd} ><Plus fontSize={18} />이미지 추가</AddForm>
        <input name="img" onChange={(e) => setImageList(e.target.files)} multiple type="file" style={{ display: "none" }} ref={imageInput} />
        <ImageForm>
          {imageList.length > 0 && Object.keys(imageList).map((item: any, index: number) => <ImageList key={index}><DocumentAdd fontSize={18} />{imageList[item].name}</ImageList>)}
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