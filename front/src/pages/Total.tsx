import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { LIKE } from "../api/url";
import { Container } from "../styled";
import { IHeader, IModalOpen } from "../ts/interface";

interface ICat {
  cat_id: number,
  count: number,
  age: number,
  gender: number,
  create_date: string
}

export const Total = ({ menuOpen, setMenuOpen }: IHeader) => {
  const [isData, setIsData] = useState<ICat[]>([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await Axios.get(`${LIKE}/best/all`)
    console.log(data.data)
    setIsData(data.data)
  }

  return (
    <Info>
      <Container>
        가장 많은 좋아요를 받은 고양이
      </Container>
    </Info>
  )
}


const Info = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: cornflowerblue;
`