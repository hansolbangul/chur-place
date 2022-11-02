import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components'
import { Cancel, Img, maxWidth, Tag } from "../styled";
import { IGetCatInfo, IGetLocation, ILatLon } from "../ts/interface";
import { defaultImage } from "../ts/export";
import { Axios } from "../api/api";
import { LOCATION } from "../api/url";
import { Comment } from "./Comment";


interface IModal {
  modalInfo: ILatLon | naver.maps.LatLng;
  viewInfo: IGetLocation | null;
  setViewInfo: (item: IGetLocation | null) => void;
  setModal: (item: boolean) => void
}

export const ViewModal = ({ modalInfo, viewInfo, setViewInfo, setModal }: IModal) => {
  const [comment, setComment] = useState<IGetCatInfo[]>([])
  const [tag, setTag] = useState<string[]>([])

  useEffect(() => {
    if (viewInfo) {
      const getInfo = async () => {
        const { data: { data: { comment, tag } } } = await Axios.get(`${LOCATION}/${viewInfo.cat_id}`)
        setComment(comment)
        setTag(tag.map((item: { name: string }) => item.name))
      }

      getInfo()
    }
  }, [viewInfo])

  const ViewInit = useCallback(() => {
    if (viewInfo) {
      return (
        <>
          <Form height={maxWidth < 500 ? 200 : 400}>
            <CatProfile src={defaultImage} />
            <Type>{viewInfo?.name}</Type>
            <TagForm>{tag.map((item, index) => <Tag key={index}>#{item}</Tag>)}</TagForm>
            <CommentForm>{comment.map(item => <Comment key={item.id} comment={item}></Comment>)}</CommentForm>
          </Form>
          {CancelBtn()}
        </>
      )
    } else {
      return (
        <>
          <Form height={maxWidth < 500 ? 200 : 400}>
            <CatProfile src={defaultImage} />
          </Form>
          {CancelBtn()}
        </>
      )
    }
  }, [viewInfo, tag, comment])

  const CancelBtn = useCallback(() => {
    return (
      <CloseBtn onClick={() => {
        setModal(false)
        if (viewInfo) setViewInfo(null)
      }}>
        <Cancel />
      </CloseBtn>
    )
  }, [viewInfo])

  return (
    <>{ViewInit()}</>
  )
}

const Type = styled.div`
  text-align: center;
  position: relative;
  top: -16px;
  font-weight: 900;
`

const TagForm = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  column-gap: 4px;
`

const CatProfile = styled(Img)`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 60px;
  height: 60px;
`

const Form = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  border-radius: 20px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 10px 0 10px;

`

const CloseBtn = styled.div`
  visibility: ${props => props.hidden ? 'hidden' : 'visible'};
  width: 40px;
  height: 40px;
  background-color: #FF7B54;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: .4s all ease-in;
`

const CommentForm = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;

`