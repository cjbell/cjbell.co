import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { H2, P } from "../components/typography"
import Link from "../components/link"
import { wrapper } from "../theme"

const Content = styled.section`
  ${wrapper}
  padding-top: 8px;
  padding-bottom: 40px;

  P {
    margin-bottom: 40px;
  }
`

const Article = styled.article`
  display: flex;
  margin-bottom: 24px;

  H2 {
    margin-bottom: 4px;
  }

  P {
    margin-bottom: 0;
  }

  small {
    width: 100px;
    font-size: 14px;
    color: #8a8f98;
    text-align: right;
    line-height: 1.3;
  }

  section {
    flex: 1;
    border-left: 1px solid #3c3e40;
    margin-left: 16px;
    padding-left: 16px;
  }
`

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM D, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

const PostsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Blog" />

      <Content>
        <P>
          I'm not a prolific writer, but when I do write it's usually about
          startups, engineering leadership, or writing sofware in Elixir.
        </P>

        {posts.map(({ node }) => (
          <Article key={node.fields.slug}>
            <small>{node.frontmatter.date}</small>

            <section>
              <H2>
                <Link to={`/posts${node.fields.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </H2>

              <P
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </Article>
        ))}
      </Content>
    </Layout>
  )
}

export default PostsPage
