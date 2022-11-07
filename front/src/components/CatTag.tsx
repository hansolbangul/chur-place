import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { maxWidth, Tag } from "../styled";
import { ISelect, ITag } from "../ts/interface";
import { toast, ToastContainer } from 'react-toastify';

interface ICatT {
  modal: boolean;
  tag: ITag[];
  select: number[];
  setSelect: (value: any) => void
}

export const CatTag = ({ modal, tag, select, setSelect }: ICatT) => {
  // const [select, setSelect] = useState<number[]>([])

  const notify = () => {
    toast.warning("태그는 3개만 사용 가능합니다.", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  const selectTag = (item: ITag) => {
    console.log(select.find(_item => _item === item.tag_id))
    if (select.find(_item => _item === item.tag_id)) {
      setSelect(select.filter(_item => _item !== item.tag_id))
    } else if (select.length === 3) {
      notify()
    } else {
      setSelect((value: any) => [...value, item.tag_id])
    }
  }

  useEffect(() => {
    if (select.length === 0) return
    else if (select.length > 3) {
      notify()
    }
  }, [select])

  useEffect(() => {
    setSelect([])
  }, [modal])

  return (
    <Column>
      <SubTitle>태그 (최대 3개)</SubTitle>
      <TagForm>
        {tag.map(_item => <TagItem onClick={() => selectTag(_item)} select={select.includes(_item.tag_id)} key={_item.tag_id}>{_item.name}</TagItem>)}
      </TagForm>
      <ToastAlert position="top-center" />
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