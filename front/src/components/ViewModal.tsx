import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components'
import { Bookmark, Cancel, Check, Flex, Img, maxWidth, OutlineHeart, Photograph, Send, Tag } from "../styled";
import { IGetCatInfo, IGetLocation, ILatLon } from "../ts/interface";
import { defaultImage } from "../ts/export";
import { Axios } from "../api/api";
import { LOCATION } from "../api/url";
import { Comments } from "./Comments";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'

const mocImage = [
  {
    id: 0,
    image: 'https://img.freepik.com/premium-photo/british-shorthair-1-year-old-stretching-his-claws-lying-in-front-of-white-background_191971-25711.jpg?w=2000'
  },
  {
    id: 1,
    image: 'https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348__480.jpg'
  },
  {
    id: 2,
    image: 'https://img.freepik.com/free-photo/close-up-portrait-on-beautiful-cat_23-2149214373.jpg?w=2000'
  }
]

const settings = {
  // spaceBetween: 10,
  modules: [Autoplay],
  navigation: {
    // prevEl:
    // nextEl:
  },
  scrollbar: {
    draggable: true,
    el: null
  },
  slidesPerView: 1,
  autoplay: {
    disableOnInteraction: false
  }
  // touchMoveStopPropagation: true,
  // onBeforeInit: // 이벤트 핸들러
};

interface IModal {
  modalInfo: ILatLon | naver.maps.LatLng;
  viewInfo: IGetLocation | null;
  setViewInfo: (item: IGetLocation | null) => void;
  setModal: (item: boolean) => void
}

export const ViewModal = ({ modalInfo, viewInfo, setViewInfo, setModal }: IModal) => {
  const [comment, setComment] = useState<IGetCatInfo[]>([])
  const [tag, setTag] = useState<string[]>([])

  const [isComment, setIsComment] = useState('')

  useEffect(() => {
    if (viewInfo) {
      const getInfo = async () => {
        const { data: { data: { comment, tag } } } = await Axios.get(`${LOCATION}/${viewInfo.cat_id}`)
        setComment(comment)
        setTag(tag.map((item: { name: string }) => item.name))
      }

      getInfo()
    }
    return () => setIsComment('')
  }, [viewInfo])

  const commentInput = useCallback(() => {
    return (
      <PostComment>
        <Input placeholder="댓글을 입력해주세요." type={'text'} value={isComment} onChange={(e) => setIsComment(e.target.value)} />
        <Send fontSize={20} marginRight={20} />
      </PostComment>
    )
  }, [isComment])

  const ViewInit = useCallback(() => {
    if (viewInfo) {
      return (
        <>
          <Form height={maxWidth < 500 ? 550 : 750}>
            <CatProfile src={defaultImage} />
            <Type>{viewInfo?.name}</Type>
            <TagForm>{tag.map((item, index) => <Tag key={index}>#{item}</Tag>)}</TagForm>
            <SwiperImage>
              <Swiper {...settings}>
                {mocImage.map(item => <SwiperSlide style={{ display: "flex", justifyContent: 'center' }} key={item.id}><SlideImg src={item.image} /></SwiperSlide>)}
              </Swiper>
            </SwiperImage>
            {commentInput()}
            <CommentForm>{comment.map(item => <Comments key={item.id} comment={item}></Comments>)}</CommentForm>
          </Form>
          {CancelBtn('view')}
        </>
      )
    } else {
      return (
        <>
          <Form height={maxWidth < 500 ? 550 : 750}>
            <CatProfile src={defaultImage} />
          </Form>
          {CancelBtn()}
        </>
      )
    }
  }, [viewInfo, tag, comment, isComment])

  const CancelBtn = useCallback((type?: string) => {
    return (
      <FooterBar>
        <FooterMenu>
          {type === 'view' ?
            <>
              <OutlineHeart fontSize={32} color={'#fff'} />
              <Bookmark fontSize={32} color={'#fff'} />
              <Photograph fontSize={32} color={'#fff'} />
            </> :
            <Check fontSize={32} color={'#fff'} />}
        </FooterMenu>
        <Btn background={'#000000'} onClick={() => {
          setModal(false)
          if (viewInfo) setViewInfo(null)
        }}>
          <Cancel />
        </Btn>
      </FooterBar>
    )
  }, [viewInfo])

  return (
    <>{ViewInit()}</>
  )
}

const SlideImg = styled(Img)`
  border-radius: 10px;
  height: 200px;
`

const SwiperImage = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
`

const CommentForm = styled.div`
  width: 100%;
  max-height: 180px;
  overflow: scroll;
`

const Type = styled.div`
  text-align: center;
  position: relative;
  top: -16px;
  font-weight: 900;
`

const TagForm = styled.div`
  display: flex;
  column-gap: 4px;
  color: #FF7B54;
  margin-bottom: 10px;
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
  position: relative;
  bottom: -24px;
  width: 100%;
  height: ${props => props.height}px;
  max-height: ${props => props.height}px;
  border-radius: 20px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 10px 10px 10px;
`

const FooterBar = styled(Flex)`
  justify-content: center;
  column-gap: 20px;
  width: 100%;
  z-index: 100;
`

const FooterMenu = styled.div`
  width: 156px;
  display: flex;
  justify-content: space-evenly;
  background-color: #FF7B54;
  border-radius: 12px;
  align-items: center;

`

const Btn = styled.div<{ background: string }>`
  width: 52px;
  background-color: ${props => props.background};
  height: 48px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: .4s all ease-in;
`

const PostComment = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 12px;
  margin-bottom: 10px;
`

const Input = styled.input`
  margin: 0 20px;
  flex: 1 1 auto;
  border: none;
`