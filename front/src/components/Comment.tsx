import React from "react";
import { IGetCatInfo } from "../ts/interface";
import styled from 'styled-components'
import { Flex, Img } from "../styled";
import { defaultImage } from "../ts/export";
import { dateFormat } from "../ts/dateTime";

interface IComment {
  comment: IGetCatInfo
}

export const Comment = ({ comment }: IComment) => {

  return (
    <CommentForm>
      <Column>
        <DefaultProfile src={defaultImage} />
        <UserName>{comment.member_name}</UserName>
      </Column>
      <Text>{comment.comment}</Text>
      <DateFormat>{dateFormat(comment.create_date)}</DateFormat>
    </CommentForm>
  )
}

const Column = styled(Flex)`
  flex-direction: column;
  row-gap: 3px;
  width: 60px;
  justify-content: center;
  align-items: center;
`

const CommentForm = styled(Flex)`
  align-items: center;
  padding: 6px;
  column-gap: 6px;
`

const DefaultProfile = styled(Img)`
  width: 40px;
  height: 40px;
`

const UserName = styled.div`
  font-weight: 900;
  width: 100%;
  font-size: 11px;
  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Text = styled.div`
  flex: 1 1 auto;
  height: 100%;

`

const DateFormat = styled.div`
  font-size: 10px;
`