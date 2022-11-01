import styled from 'styled-components'
const maxWidth = window.innerWidth

export const Mobile = styled.div`
  width: ${maxWidth < 500 ? maxWidth : 500}px;

`