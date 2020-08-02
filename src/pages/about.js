import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { H1, H2, P } from "../components/typography"
import Link from "../components/link"
import { wrapper, spacer } from "../theme"

const Content = styled.section`
  ${wrapper}
  padding-top: 20px;
  padding-bottom: 40px;

  H1 {
    margin: ${spacer(2)}px 0;
    text-align: center;
  }

  H2 {
    margin: ${spacer(5)}px 0 ${spacer(3)}px;
  }
`

const ProfilePicWrapper = styled.div`
  width: 100px;
  margin: 0 auto;
  border-radius: 100%;
  overflow: hidden;
`

export const query = graphql`
  query {
    profileImage: file(relativePath: { eq: "profile-pic.jpg" }) {
      childImageSharp {
        fixed(width: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const AboutPage = ({ data }) => (
  <Layout>
    <SEO title="About Chris" />

    <Content>
      <ProfilePicWrapper>
        <Img fixed={data.profileImage.childImageSharp.fixed} />
      </ProfilePicWrapper>

      <H1>Nice to meet you, I'm Chris 👋</H1>

      <P>
        I'm a British born Engineering Leader that's been in the US for the past
        7 years, and live with my wife Dana in Brooklyn, NY (more specifically,
        in Brooklyn Heights).
      </P>

      <P>
        I've been a software engineer for the past 10 years, starting life in
        digital marketing after getting a Computer Science degree. I quickly
        realized that marketing wasn't totally where I wanted to be, and after
        falling into the Lean Startup scene in London and becoming obsessed with
        the book by Eric Reis, I switched to a more product focussed role at{" "}
        <Link to="https://madebymany.com">Made by Many</Link>, where I learned
        to appreciate customer-centric product development techniques.
      </P>

      <P>
        Working at Made by Many lead me to NYC, where I helped establish and
        help lead our NYC based office, ultimately working as Technical Director
        of a team of 4 engineers and growing the studio to 12 people. After Made
        by Many, I lead the engineering team at{" "}
        <Link to="https://frame.io">Frame.io</Link> through Series A – C and
        helped re-platform to Elixir and React, growing the engineering team
        from 7 - 30.
      </P>

      <P>
        After Frame.io I did a stint as CTO at an early-stage Healthcare
        startup, <Link to="https://murumed.com">Muru</Link> building a mobile
        app to help EMTs get access to life-saving, critical care information.
        Ultimately deciding that healthcare wasn't for me, I now{" "}
        <Link to="/work-with-me">consult as a CTO for hire</Link> while I
        explore some startup ideas of my own.
      </P>

      <H2>Technical Expertise</H2>

      <P>
        Throughout my career I've been lucky enough to really work across the
        full-stack; and while my focus has shifted over the last few years to be
        quite Elixir and backend dominated, I still love to build applications
        end-to-end.
      </P>

      <P>
        Some technology I've used recently: Elixir, NodeJS, Ruby-on-Rails,
        React, React Native. I've worked on systems in AWS and Google Cloud.
      </P>

      <ul>
        <li></li>
      </ul>

      <H2>Outside of work</H2>

      <P>
        Outside of things on a screen, I love to cycle, play squash, camp, hike
        and generally be outside. I'm also known to play the odd round of
        Fortnite.
      </P>

      <H2>About this site</H2>

      <P>
        This site is written in Gatsby JS using Styled Components and hosted on
        Netlify
      </P>
    </Content>
  </Layout>
)

export default AboutPage
