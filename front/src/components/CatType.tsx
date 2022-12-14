import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IType } from "../ts/interface";
import TestImage from '../img/image.svg'

interface ICatT {
  type: IType[];
  select: number;
  setSelect: (value: any) => void
}

export const CatType = ({ type, select, setSelect }: ICatT) => {
  const addRef = useRef<any>(null)
  const [option, setOption] = useState<boolean>(false)

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [option])

  const handleOutside = (e: any) => {
    // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
    if (option && addRef.current && !addRef.current.contains(e.target)) {
      setOption(false)
    }
  }

  return (
    <Column ref={addRef}>
      <Select onClick={() => setOption(item => !item)}>{select !== 0 && <img className="icon" src={require(`../img/type_${select}.svg`)} />} {select === 0 ? '종류를 선택해주세요.' : type.find(item => item.type_id === select)?.name}</Select>
      {type.map(item => <Option onClick={() => {
        setSelect(item.type_id)
        setOption(false)
      }} visible={option} top={item.type_id} key={item.type_id}>
        <img className="icon" src={require(`../img/type_${item.type_id}.svg`)} />{item.name}</Option>)
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
  margin-top: 8px;
  top: ${props => props.visible ? props.top * 46 : 0}px;
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