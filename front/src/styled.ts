import styled from 'styled-components'
import { HiPlusSm, HiX, HiCheck, HiOutlineHeart, HiHeart, HiOutlineBookmark, HiOutlinePhotograph, HiDocumentAdd, HiUser, HiKey, HiMenu, HiOutlineLightBulb, HiBookmark } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
export const maxWidth = window.innerWidth

/// design system
export const bold = 'S-CoreDream-6Bold'
export const mainTheme = '#FF7B54'
export const subTheme = '#C0C0C0'


export const Mobile = styled.div`
  width: 100vw;

  @media screen and (max-width: 500px) {
    width: ${maxWidth < 500 ? maxWidth : 500}px;
  }
`

export const Div = styled.div`

`
export const Flex = styled.div<{ justify?: string, margin?: string, align?: string }>`
  display: flex;

  ${props => props.justify && `justify-content: ${props.justify};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.align && `align-items: ${props.align};`}
`

export const Img = styled.img`

`

export const Tag = styled.div`

`

export const Span = styled.span``

export const Title = styled.div`
  font-size: 21px;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`


/// 아이콘

export const Send = styled(FiSend) <{ fontSize?: number, marRight?: number }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  margin-right: 10px;
`

export const Check = styled(HiCheck) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const OutlineHeart = styled(HiOutlineHeart) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const Heart = styled(HiHeart) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const OutlineBookmark = styled(HiOutlineBookmark) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const Bookmark = styled(HiBookmark) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const Photograph = styled(HiOutlinePhotograph) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const Hamburger = styled(HiMenu) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const Question = styled(HiOutlineLightBulb) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const LoginUser = styled(HiUser) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const LoginPassword = styled(HiKey) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const DocumentAdd = styled(HiDocumentAdd) <{ fontSize?: number, color?: string }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
  ${props => props.color && `color: ${props.color}`};
`

export const Cancel = styled(HiX)`
  color: #fff;
  font-size: 32px;
`

export const Plus = styled(HiPlusSm) <{ fontSize?: number, color?: string }>`
  ${props => props.color && `color: ${props.color}`};
  ${props => props.fontSize && `font-size: ${props.fontSize}px`};
`