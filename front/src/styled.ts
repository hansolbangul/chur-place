import styled from 'styled-components'
export const maxWidth = window.innerWidth


export const Mobile = styled.div`
  width: 100vw;
  height: 100vh;

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