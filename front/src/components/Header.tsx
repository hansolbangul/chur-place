import styled from "styled-components";
import { Flex, Hamburger, Question } from "../styled";

interface IHeader {
  setMenu: (ele: any) => void;
  info: boolean;
  setInfo: (ele: boolean) => void;
}

export const Header = ({ setMenu, info, setInfo }: IHeader) => {

  const Information = () => {
    return (
      // TODO 스와이퍼
      <Info onClick={() => setInfo(false)} />
    )
  }
  return (
    <Container justify="space-between" align="center">
      {info && <Information />}
      <Circle onClick={() => setMenu((ele: any) => !ele)} justify="center" align="center">
        <Hamburger fontSize={24} />
      </Circle>
      <Circle onClick={() => setInfo(true)} justify="center" align="center">
        <Question fontSize={30} />
      </Circle>
    </Container>
  )
}

const Info = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
  top: 0;
  left: 0;
`

const Container = styled(Flex)`
  width: 100%;
  position: absolute;
  top: 40px;
  z-index: 999;
`

const Circle = styled(Flex)`
  width: 48px;
  height: 48px;
  border-radius: 40px;
  background-color: #fff;
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.25);
  margin: 0 20px;
`