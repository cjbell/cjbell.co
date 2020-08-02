import React from "react"
import { Reset } from "styled-reset"
import { createGlobalStyle } from "styled-components"
import PropTypes from "prop-types"
import Header from "../components/header"

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
    font-size: 16px;
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    background-color: #828fff;
    color: #fff;
  }

  body {
    background-color: #222326;
    min-height: 100vh;
  }

  a {
    color: #828fff;
  }
`

const Layout = ({ children }) => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
