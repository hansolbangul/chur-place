import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components'
import { Bookmark, Cancel, Check, Flex, Img, maxWidth, OutlineHeart, Photograph, Send, Tag, Title } from "../styled";
import { IGetCatInfo, IGetLocation, ILatLon, ISelect, ITag, IType } from "../ts/interface";
import { defaultImage, success_notify, warning_notify } from "../ts/export";
import { Axios } from "../api/api";
import { CAT, LOCATION } from "../api/url";
import { Comments } from "./Comments";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'
import { CatType } from "./CatType";
import { CatTag } from "./CatTag";
import { CatImage } from "./CatImage";

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
};

interface IModal {
  modalInfo: ILatLon | naver.maps.LatLng;
  viewInfo: IGetLocation | null;
  setViewInfo: (item: IGetLocation | null) => void;
  modal: boolean;
  setModal: (item: boolean) => void;
  map: any;
  setMarker: (value: any) => void
}

export const ViewModal = ({ modalInfo, viewInfo, setViewInfo, modal, setModal, map, setMarker }: IModal) => {
  const [comment, setComment] = useState<IGetCatInfo[]>([])
  const [catTag, setCatTag] = useState<string[]>([])
  const [type, setType] = useState<IType[]>([])
  const [tag, setTag] = useState<ITag[]>([])

  const [selectTag, setSelectTag] = useState<number[]>([])
  const [selectType, setSelectType] = useState<number>(0)

  const [isComment, setIsComment] = useState('')

  useEffect(() => {
    if (viewInfo) {
      getInit()
    }
    return () => setIsComment('')
  }, [viewInfo])

  useEffect(() => {
    const getInfo = async () => {
      const [{ data: { data: tag } },
        { data: { data: type } }] = await Promise.all([
          Axios.get(`${CAT}/tag`),
          Axios.get(`${CAT}/type`)
        ])
      setTag(tag)
      setType(type)
    }

    getInfo()
  }, [])

  const getInit = async () => {
    if (viewInfo) {
      const { data: data } = await Axios.get(`${LOCATION}/${viewInfo.cat_id}`)
      if (data.result) {
        const { comment: catComment, tag: catTag } = data.data
        setComment(catComment)
        setCatTag(catTag.length > 0 ? catTag.map((item: { name: string }) => item.name) : [])
      }
    }
  }

  const postComment = async () => {
    if (viewInfo) {
      const { data } = await Axios.post(`${CAT}/comment/${viewInfo.cat_id}`, { comment: isComment })

      if (data.result) {
        success_notify('등록에 성공하였습니다.')
        getInit()
      }
    }
  }

  const commentInput = useCallback(() => {
    return (
      <PostComment>
        <Input placeholder="댓글을 입력해주세요." type={'text'} value={isComment} onChange={(e) => setIsComment(e.target.value)} />
        <Send onClick={postComment} fontSize={20} />
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
            <TagForm>{catTag.map((item, index) => <Tag key={index}>#{item}</Tag>)}</TagForm>
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
          <Form none height={maxWidth < 500 ? 550 : 750}>
            <Title>고양이 제보하기</Title>
            <CatType setSelect={setSelectType} select={selectType} type={type} modal={modal} />
            <CatTag setSelect={setSelectTag} select={selectTag} tag={tag} modal={modal} />
            <CatImage />
          </Form>
          {CancelBtn()}
        </>
      )
    }
  }, [viewInfo, catTag, comment, isComment, modal, selectTag, selectType])

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
            <Check onClick={saveCat} fontSize={32} color={'#fff'} />}
        </FooterMenu>
        <Btn background={'#000000'} onClick={() => {
          setModal(false)
          if (viewInfo) {
            setTimeout(() => { setViewInfo(null) }, 300)
          }
        }}>
          <Cancel />
        </Btn>
      </FooterBar>
    )
  }, [viewInfo, selectTag, selectType])

  const saveCat = async () => {
    const { data } = await Axios.post(CAT, { lat: modalInfo.y, lon: modalInfo.x, type: selectType, tag: selectTag })

    if (data.result) {
      const getClickHandler = (item: any) => {
        setViewInfo(item)
      }

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(modalInfo.y, modalInfo.x),
        map: map,
        title: '고양이',
        icon: {
          content: `<img class='icon' src=${defaultImage} />`,
        }
      })
      setMarker(marker)
      naver.maps.Event.addListener(marker, "click", () => getClickHandler(data.data))
    }

    setModal(false)
    if (viewInfo) {
      setTimeout(() => { setViewInfo(null) }, 300)
    }
  }

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

const Form = styled.div<{ height: number, none?: boolean }>`
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
  padding: ${props => props.none ? '20px 10px 10px 10px' : '40px 10px 10px 10px'};
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