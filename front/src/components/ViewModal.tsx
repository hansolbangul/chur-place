import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components'
import { Bookmark, Cancel, Check, Flex, Heart, Img, maxWidth, OutlineBookmark, OutlineHeart, Photograph, Send, Tag, Title } from "../styled";
import { IGetCatInfo, IGetLocation, IImg, ILatLon, ITag, IType } from "../ts/interface";
import { success_notify, warning_notify } from "../ts/export";
import { Axios } from "../api/api";
import { CAT, HEART, LIKE, LOCATION } from "../api/url";
import { Comments } from "./Comments";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'
import { CatType } from "./CatType";
import { CatTag } from "./CatTag";
import { CatImage } from "./CatImage";

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
  const [image, setImage] = useState<IImg[]>([])

  const [selectTag, setSelectTag] = useState<number[]>([])
  const [selectType, setSelectType] = useState<number>(0)
  const [heart, setHeart] = useState<boolean>(false)
  const [like, setLike] = useState<boolean>(false)

  const [isComment, setIsComment] = useState('')

  // const [imageList, setImageList] = useState<[File[]] | null>(null)
  const [imageList, setImageList] = useState<any>([])
  const [inputView, setInputView] = useState<boolean>(false)

  useEffect(() => {
    if (viewInfo) {
      getInit()
    }
    return () => {

    }
  }, [viewInfo])

  useEffect(() => {
    setIsComment('')
    setSelectType(0)
    setSelectTag([])
    setImage([])
    setImageList([])
    setInputView(false)
  }, [modal])

  useEffect(() => {
    const getInfo = async () => {
      const [{ data: { data: tag } },
        { data: { data: type } }
      ] = await Promise.all([
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
      const [
        { data: data },
        { data: heartData },
        { data: likeData }
      ] = await Promise.all([
        Axios.get(`${LOCATION}/${viewInfo.cat_id}`),
        Axios.get(`${HEART}/${viewInfo.cat_id}`),
        Axios.get(`${LIKE}/${viewInfo.cat_id}`)
      ])
      if (data.result && heartData.result) {
        setHeart(heartData.data)
        setLike(likeData.data)
        const { comment: catComment, tag: catTag, img: catImg } = data.data
        setComment(catComment)
        console.log(catImg)
        setImage(catImg)
        setCatTag(catTag.length > 0 ? catTag.map((item: { name: string }) => item.name) : [])
      }
    }
  }

  const postComment = async () => {
    if (viewInfo) {
      const { data } = await Axios.post(`${CAT}/comment/${viewInfo.cat_id}`, { comment: isComment })

      if (data.result) {
        success_notify('등록에 성공하였습니다.')
        setIsComment('')
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

  const HeartBtn = useCallback(() => {
    const postHeart = async () => {
      const { data } = await Axios.patch(`${HEART}`, { cat_id: viewInfo?.cat_id })
      setHeart(data.data)
    }

    if (heart) {
      return <Heart onClick={postHeart} fontSize={32} color={'#fff'} />
    } else {
      return <OutlineHeart onClick={postHeart} fontSize={32} color={'#fff'} />
    }
  }, [heart, viewInfo])

  const LikeBtn = useCallback(() => {
    const postLike = async () => {
      const { data } = await Axios.patch(`${LIKE}`, { cat_id: viewInfo?.cat_id })
      setLike(data.data)
    }

    if (like) {
      return <Bookmark onClick={postLike} fontSize={32} color={'#fff'} />
    } else {
      return <OutlineBookmark onClick={postLike} fontSize={32} color={'#fff'} />
    }
  }, [like, viewInfo])

  const CancelBtn = useCallback((type?: string) => {
    return (
      <FooterBar>
        <FooterMenu>
          {type === 'view' ?
            <>
              {HeartBtn()}
              {LikeBtn()}
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
  }, [viewInfo, selectTag, selectType, heart, like, imageList])

  const postImages = async (id: number) => {
    const formData = new FormData();
    Array.from({ length: Object.keys(imageList).length }).map((_, index) => {
      formData.append('img', imageList[index]);
    })
    const { data } = await Axios.post(`${CAT}/image/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return data
  }

  const addImg = async () => {
    if (viewInfo) {
      const data = await postImages(viewInfo.cat_id)
      if (data.result) {
        success_notify('등록 성공')
        setModal(false)
        if (viewInfo) {
          setTimeout(() => { setViewInfo(null) }, 300)
        }
      }
    }
  }

  const saveCat = async () => {
    if (selectType === 0 || selectTag.length === 0) {
      warning_notify('타입과 태그는 필수입니다.')
      return
    }

    const { data } = await Axios.post(CAT, { lat: modalInfo.y, lon: modalInfo.x, type: selectType, tag: selectTag })

    try {
      if (data.result) {
        const getClickHandler = (item: any) => {
          setViewInfo(item)
        }

        const image = require(`../img/type_${data.data.type_id}.svg`)
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(modalInfo.y, modalInfo.x),
          map: map,
          title: '고양이',
          icon: {
            content: `<img class='icon' src=${image} />`,
          }
        })
        setMarker(marker)
        naver.maps.Event.addListener(marker, "click", () => getClickHandler(data.data))
      }

      if (imageList.length > 0) {
        const result = await postImages(data.data.cat_id)
        console.log(result)
      }

      setModal(false)
      success_notify('고양이 등록 성공!')
      setImageList([])
      if (viewInfo) {
        setTimeout(() => { setViewInfo(null) }, 300)
      }
    } catch (error) {
      warning_notify('등록에 실패하였습니다.')
    }
  }

  return (
    // <>{ViewInit()}</>
    <>{viewInfo ? <>
      <Form maxHeight={550}>
        <CatProfile src={require(`../img/type_${viewInfo.type_id}.svg`)} />
        <TagForm>{catTag.map((item, index) => <Tag key={index}>#{item}</Tag>)}</TagForm>
        <SwiperImage>
          <Swiper {...settings}>
            {image.map((item, index) => {
              return <SwiperSlide style={{ display: "flex", justifyContent: 'center' }} key={index}><SlideImg src={item.path} /></SwiperSlide>
            })}
            <SwiperSlide style={{ display: "flex", justifyContent: 'center', height: '100%' }}>
              <AddImg onClick={() => setInputView(item => !item)}>{inputView ?
                <Flex style={{ flexDirection: 'column', rowGap: '8px', width: '100%' }}>
                  <CatImage imageList={imageList} setImageList={setImageList} />
                  <ImgAddBtn onClick={addImg}>저장</ ImgAddBtn>
                </Flex> : <Flex style={{ height: '200px' }} justify='center' align="center">이미지 추가하기</Flex>}
              </AddImg>
            </SwiperSlide>
          </Swiper>

        </SwiperImage>
        {commentInput()}
        <CommentForm>{comment.map(item => <Comments key={item.id} comment={item}></Comments>)}</CommentForm>
      </Form>
      {CancelBtn('view')}
    </> : <>
      <Form none maxHeight={550}>
        <Title>고양이 제보하기</Title>
        <CatType setSelect={setSelectType} select={selectType} type={type} />
        <CatTag setSelect={setSelectTag} select={selectTag} tag={tag} />
        <CatImage imageList={imageList} setImageList={setImageList} />
      </Form>
      {CancelBtn()}</>
    }</>
  )
}

const ImgAddBtn = styled.button`
      background-color: #FF7B54;
      width: 100%;
      border: none;
      border-radius: 12px;
      padding: 4px;
      `

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

const Form = styled.div<{ maxHeight: number, none?: boolean }>`
      position: relative;
      bottom: -24px;
      width: 100%;
      height: ${props => props.maxHeight}px;
      max-height: ${props => props.maxHeight}px;
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

const AddImg = styled.div`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px dashed gray;
      border-radius: 12px;

      cursor: pointer;
      `