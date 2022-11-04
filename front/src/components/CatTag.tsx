import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { CAT } from "../api/url";
import { Tag } from "../styled";
import { ITag } from "../ts/interface";

export const CatTag = () => {
  const [tag, setTag] = useState<ITag[]>([])
  const [select, setSelect] = useState<number[]>([])

  useEffect(() => {
    const getInfo = async () => {
      // 추후에 이전 페이지에서 promise로 호출 가능
      const { data: { data } } = await Axios.get(`${CAT}/tag`)
      setTag(data)
    }

    getInfo()
  }, [])
  return (
    <Column>
      <SubTitle>태그 (최대 3개)</SubTitle>
      <TagForm>
        {tag.map(item => <TagItem select={select.includes(item.tag_id)} key={item.tag_id}>{item.name}</TagItem>)}
      </TagForm>
    </Column>
  )
}

const Column = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
`

const SubTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`

const TagForm = styled.div`
  width: 80%;
  /* height: 200px; */
  max-height: 200px;
  overflow: scroll;
  /* background-color: #a9a9a9; */
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

`

const TagItem = styled(Tag) <{ select?: boolean }>`
  padding: 4px 10px;
  display: flex;
  align-items: center;
  font-size: 13px;
  border: 1px solid gray;
  border-radius: 12px;
  ${props => props.select && 'background-color: #FF7B54; color: #fff;'}
`