import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { H1, P } from "../components/typography"
import Link from "../components/link"
import { wrapper } from "../theme"

const Wrapper = styled.div`
  ${wrapper}
`

const Article = styled.article``

const Content = styled.section`
  line-height: 1.4;
  color: #dadada;

  p,
  ul,
  ol {
    margin-bottom: 16px;
  }

  .gatsby-highlight {
    margin: 32px 0;

    pre {
      font-size: 80%;
      border: none;
      background-color: #1b1c1d;
      box-shadow: none;
    }
  }

  blockquote {
    border-left: 6px solid #333;
    padding: 16px;
    color: #fff;
    background-color: #1b1c1d;
    margin: 24px 0;

    p:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 24px 0 12px;
    color: #fff;
  }

  h2 {
    font-size: 1.3em;
  }

  h3 {
    font-size: 1.2em;
  }

  h4 {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
  }

  ul li {
    margin-left: 20px;
    list-style-type: disc;
  }

  ol li {
    margin-left: 20px;
    list-style-type: decimal;
  }

  .gatsby-resp-image-wrapper {
    margin-bottom: 32px;
  }
`

const ProfilePicWrapper = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  margin: 0 16px 0 0;
  border-radius: 100%;
  overflow: hidden;
`

const Header = styled.header`
  padding-bottom: 8px;
  border-bottom: 1px solid #1b1c1d;
`

const About = styled.div`
  display: flex;
  align-items: center;

  P {
    font-size: 14px;
    margin-bottom: 0;
  }
`

const Footer = styled.footer`
  border-top: 1px solid #1b1c1d;
  padding: 24px 0;
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Wrapper>
        <Article>
          <Header>
            <H1>{post.frontmatter.title}</H1>
            <P muted>{post.frontmatter.date}</P>
          </Header>

          <Content dangerouslySetInnerHTML={{ __html: post.html }} />
        </Article>

        <Footer>
          <About>
            <ProfilePicWrapper>
              <Img fixed={data.profileImage.childImageSharp.fixed} />
            </ProfilePicWrapper>

            <P>
              Hey, I'm <Link to="/about">Chris Bell</Link> 👋, an engineering
              leader based in NYC. I write about startups, engineering
              leadership and writing software using Elixir.
            </P>
          </About>
        </Footer>
      </Wrapper>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    profileImage: file(relativePath: { eq: "profile-pic.jpg" }) {
      childImageSharp {
        fixed(width: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
