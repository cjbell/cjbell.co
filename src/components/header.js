import React from "react"
import styled from "styled-components"
import Link from "./link"
import { wrapper, spacer } from "../theme"

const Container = styled.div`
  border-top: 1.5px solid #828fff;
`

const Header = styled.header`
  ${wrapper}
  display: flex;
  align-items: center;
  margin-bottom: ${spacer(4)}px;

  &:before {
  }
`

const SiteIcon = styled.div`
  a {
    border: 1.5px solid #828fff;
    border-top: none;
    padding: 24px 8px 8px;
    display: block;
    color: #828fff;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      background-color: #828fff;
      color: #fff;
    }
  }
`

const Navigation = styled.nav`
  margin-left: auto;
`

const NavigationItems = styled.ul`
  display: flex;
`

const NavigationItem = styled.li`
  margin-right: ${spacer(2)}px;
  font-size: 15px;

  a {
    color: #828fff;
    font-weight: 600;
    text-decoration: none;

    &:hover,
    &:active,
    &.active {
      color: #fff;
    }
  }

  &:last-child {
    margin-right: 0;
  }
`

const SiteHeader = () => (
  <Container>
    <Header>
      <SiteIcon>
        <Link to="/">cjbell</Link>
      </SiteIcon>

      <Navigation>
        <NavigationItems>
          <NavigationItem>
            <Link to="/about">About</Link>
          </NavigationItem>
          <NavigationItem>
            <Link to="/posts">Blog</Link>
          </NavigationItem>
          <NavigationItem>
            <Link to="/work-with-me">Work with me</Link>
          </NavigationItem>
        </NavigationItems>
      </Navigation>
    </Header>
  </Container>
)

export default SiteHeader
