import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Axios } from "../api/api";
import { CAT } from "../api/url";
import { IType } from "../ts/interface";
import TestImage from '../img/image.svg'

interface ICatT {
  modal: boolean;
}

export const CatType = ({ modal }: ICatT) => {
  const addRef = useRef<any>(null)
  const [type, setType] = useState<IType[]>([])
  const [option, setOption] = useState<boolean>(false)
  const [select, setSelect] = useState<number>(0)

  useEffect(() => {
    const getInfo = async () => {
      // 추후에 이전 페이지에서 promise로 호출 가능
      const { data: { data } } = await Axios.get(`${CAT}/type`)
      setType(data)
      console.log(data)
    }

    getInfo()
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [option])

  useEffect(() => {
    setSelect(0)
  }, [modal])

  const handleOutside = (e: any) => {
    // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
    if (option && addRef.current && !addRef.current.contains(e.target)) {
      setOption(false)
    }
  }

  return (
    <Column ref={addRef}>
      <Select onClick={() => setOption(item => !item)}>{select !== 0 && <img src={TestImage} />} {select === 0 ? '종류를 선택해주세요.' : type.find(item => item.type_id === select)?.name}</Select>
      {type.map(item => <Option onClick={() => {
        setSelect(item.type_id)
        setOption(false)
      }} visible={option} top={item.type_id} key={item.type_id}>
        <img src={TestImage} />{item.name}</Option>)
      }
    </Column >
  )
}

const Column = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
`

const Select = styled.div`
  width: 50%;
  height: 30px;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  padding: 6px 20px;
  justify-content: center;
  column-gap: 10px;
  z-index: 99;
`

const Option = styled.div<{ top: number, visible: boolean }>`
  position: absolute;
  border-radius: 12px;
  margin-top: 10px;
  top: ${props => props.visible ? props.top * 51 : 0}px;
  /* width: 50%; */
  height: 30px;
  background-color: #fff;
  border: 1px solid gray;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  display: flex;
  align-items: center;
  column-gap: 10px;
  /* justify-content: space-between; */
  padding: 6px 20px;
  z-index: 98;

  transition: .3s all ease-out;
`