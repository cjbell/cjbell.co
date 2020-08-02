import React from "react"
import styled from "styled-components"

export const H1 = styled.h1`
  font-size: 1.5em;
  line-height: 1.4;
  font-weight: normal;
`

export const H2 = styled.h2`
  font-size: 1.25em;
  line-height: 1.4;
  font-weight: normal;
`

export const Strong = styled.strong`
  font-weight: 600;
`

export const P = styled.p`
  font-size: 1em;
  line-height: 1.4;
  margin-bottom: 16px;
  color: ${props => (props.muted ? "#8a8f98" : "#dadada")};

  Strong {
    color: #fff;
  }
`
