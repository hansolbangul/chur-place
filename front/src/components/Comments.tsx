import React from "react";
import { IGetCatInfo } from "../ts/interface";
import styled from 'styled-components'
import { Flex, Img } from "../styled";
import { defaultImage } from "../ts/export";
import { dateFormat } from "../ts/dateTime";

interface IComment {
  comment: IGetCatInfo
}

export const Comments = ({ comment }: IComment) => {

  return (
    <CommentForm>
      <DefaultProfile src={defaultImage} />
      <Column>
        <Line justify>
          <UserName>{comment.member_name}</UserName>
          <DateFormat>{dateFormat(comment.create_date)}</DateFormat>
        </Line>
        <Line>
          <Text>{comment.comment}</Text></Line>
      </Column>
    </CommentForm>
  )
}

const Column = styled(Flex)`
  flex-direction: column;
  flex: 1 1 auto;
`

const CommentForm = styled(Flex)`
  margin: 0 10px 8px 0;
  align-items: center;
  padding: 6px;
  column-gap: 6px;
`

const Line = styled.div<{ justify?: boolean }>`
  display: flex;
  margin: 4px 8px 4px 8px;
  width: 100%;
  ${props => props.justify && 'justify-content: space-between'}
`

const DefaultProfile = styled(Img)`
  width: 32px;
  height: 32px;
`

const UserName = styled.div`
  font-weight: 900;
  font-size: 14px;
`

const Text = styled.div`
  flex: 1 1 auto;
  height: 100%;
  font-size: 14px;
`

const DateFormat = styled.div`
  font-size: 10px;
  opacity: 0.4;
`