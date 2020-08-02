import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { H1, H2, Strong, P } from "../components/typography"
import Link from "../components/link"
import { wrapper, spacer } from "../theme"

const Content = styled.section`
  ${wrapper}
`

const Section = styled.section`
  padding-bottom: ${spacer(3)}px;
  border-bottom: 1px solid #292830;

  H1 {
    margin: ${spacer(2)}px 0;
  }

  H2 {
    margin: ${spacer(3)}px 0;
  }

  ul li {
    margin-bottom: ${spacer(3)}px;
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Content>
      <Section>
        <H1>
          <Strong>Chris Bell</Strong> is an Engineering Leader based in
          Brooklyn, NY and currently working as a{" "}
          <Link to="/work-with-me">CTO for hire</Link>.
        </H1>

        <P muted>
          I'm a full-stack engineer mostly using Elixir, NodeJS, React, and
          React Native to bring new products and services to life.{" "}
          <Link to="/about">More about me</Link>.
        </P>
      </Section>
      <Section>
        <H2>Notable things</H2>

        <ul>
          <li>
            <P>
              <Strong>EMPEX Conference</Strong>: For the past 5 years I've been
              a co-organizer at the{" "}
              <Link to="https://empex.co">EMPEX conference</Link> in NYC where
              we host a one of a kind conference for the Elixir programming
              language in a Jazz club in SoHo.
            </P>
          </li>
          <li>
            <P>
              <Strong>ElixirTalk Podcast</Strong>: I'm a co-host (alongside
              Desmond Bowe) on the popular{" "}
              <Link to="https://elixirtalk.com">ElixirTalk podcast</Link>, where
              we discuss application design and the state of the ecosystem.
              We've had some pretty incredible guests on over the years.
            </P>
          </li>
          <li>
            <P>
              <Strong>Speaking</Strong>: I've given a few talks over the years,
              mostly about Elixir (unsuprisingly). My favorites are{" "}
              <Link to="https://www.youtube.com/watch?v=fkDhU-2NWJ8">
                Selling Food with Elixir
              </Link>{" "}
              at Elixir Conf, 2016 and{" "}
              <Link to="https://www.youtube.com/watch?v=Aa--NDjL9SI">
                Shipping a Replacement Architecture in Elixir
              </Link>{" "}
              from EMPEX LA, 2018.
            </P>
          </li>
          <li>
            <P>
              <Strong>Front-end London</Strong>: Way back in 2013 I co-founded a
              front-end meetup while at{" "}
              <Link to="https://madebymany.com">Made by Many</Link> in London,
              inventively named{" "}
              <Link to="https://frontendlondon.co.uk">Front-end London</Link>.
              We even spun it out into a one day, single track conference called
              EpicFEL.
            </P>
          </li>
        </ul>
      </Section>

      <Section>
        <H2>Elsewhere</H2>

        <P>
          I'm available across this world-wide-web, like most people, on a few
          platforms.
        </P>

        <P>
          <Link to="https://twitter.com/cjbell_">Twitter</Link> •{" "}
          <Link to="https://github.com/cjbell">Github</Link> •{" "}
          <Link to="https://www.linkedin.com/in/chrisbell88/">LinkedIn</Link> •{" "}
          <Link to="mailto:chris@cjbell.co">Email me</Link>
        </P>
      </Section>
    </Content>
  </Layout>
)

export default IndexPage
