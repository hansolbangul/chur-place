import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { CAT } from "../api/url";
import { maxWidth, Tag } from "../styled";
import { ITag } from "../ts/interface";
import { toast, ToastContainer } from 'react-toastify';

export const CatTag = () => {
  const [tag, setTag] = useState<ITag[]>([])
  const [select, setSelect] = useState<number[]>([])

  const notify = () => {
    toast.warning("태그는 3개만 사용 가능합니다.", {
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    const getInfo = async () => {
      // 추후에 이전 페이지에서 promise로 호출 가능
      const { data: { data } } = await Axios.get(`${CAT}/tag`)
      setTag(data)
    }

    getInfo()
  }, [])

  const selectTag = (item: ITag) => {
    console.log(select.find(_item => _item === item.tag_id))
    if (select.find(_item => _item === item.tag_id)) {
      setSelect(select.filter(_item => _item !== item.tag_id))
    } else if (select.length === 3) {
      notify()
    } else {
      setSelect(value => [...value, item.tag_id])
    }
  }

  useEffect(() => {
    if (select.length === 0) return
    else if (select.length > 3) {
      notify()
    }
  }, [select])

  return (
    <Column>
      <SubTitle>태그 (최대 3개)</SubTitle>
      <TagForm>
        {tag.map(item => <TagItem onClick={() => selectTag(item)} select={select.includes(item.tag_id)} key={item.tag_id}>{item.name}</TagItem>)}
      </TagForm>
      <ToastAlert position="top-center" limit={1} />
    </Column>
  )
}

const ToastAlert = styled(ToastContainer)`
  

  @media screen and (max-width: 500px) {
    width: ${maxWidth < 500 && 300}px;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%)
  }

`

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
  max-height: 200px;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;

`

const TagItem = styled(Tag) <{ select?: boolean }>`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  font-size: 13px;
  border: 1px solid gray;
  border-radius: 12px;
  cursor: pointer;
  ${props => props.select && 'background-color: #FF7B54; color: #fff;'}
`