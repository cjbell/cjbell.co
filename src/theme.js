import { css } from "styled-components"

const baseValue = 8

export const colors = {}

export function spacer(multiplier = 1) {
  return multiplier * baseValue
}

export const wrapper = css`
  max-width: 640px;
  margin: 0 auto;
  padding: 0 16px;
`
