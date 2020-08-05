import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { H1, H2, P } from "../components/typography"
import Link from "../components/link"
import { wrapper, spacer } from "../theme"

const Content = styled.section`
  ${wrapper}
  padding-bottom: 40px;

  H1 {
    margin: ${spacer(2)}px 0;
  }

  H2 {
    margin: ${spacer(4)}px 0 ${spacer(2)}px 0;
  }

  ul {
  }

  ul li {
    margin-left: 20px;
    list-style-type: disc;
  }
`

const Callout = styled.span`
  background-color: #1b1c1d;
  border-radius: 3px;
  color: #fff;
  display: block;
  padding: ${spacer(2)}px;
  margin-bottom: ${spacer(3)}px;
`

const WorkWithMePage = () => (
  <Layout>
    <SEO title="Work with me" />

    <Content>
      <H1>Working with me</H1>

      <Callout>Please note: I'm currently booked through October 2020</Callout>

      <P>
        As a CTO for hire, I help companies with their technology execution and
        strategy. This can take many forms, such as helping turn an early-stage
        idea into an executable roadmap, leading the development of new software
        for a team, or providing more specific Elixir-based consulting.
      </P>

      <P>
        At the moment I'm also working alongside two amazing design studios;{" "}
        <Link to="https://superliminal.studio">Superliminal</Link> with my dear
        friend and long-time collaborator, Adam Brodowski, and{" "}
        <Link to="https://clade.design">Clade Design</Link> alongside Sara and
        Logan, who I worked with while at Muru. Via these partners I can offer
        full design services like rapid prototyping, user research as well as
        more typical product design and branding.
      </P>

      <H2>What kind of projects do you do?</H2>

      <P muted>
        My work varies depending on the client needs, but here are some examples
        of projects I've helped with recently:
      </P>

      <ul>
        <li>
          <P>
            Laying out the technology strategy for a new startup who don't have
            a technical co-founder as a roadmap to take them from 0 to 1.
          </P>
        </li>
        <li>
          <P>
            Building and launching a new product MVP working alongside a design
            firm, writing the code and acting as a CTO for the non-technical
            founders.
          </P>
        </li>
        <li>
          <P>
            Assisting in the performance tuning of an Elixir application that
            has strict performance requirements to hit for a round of funding.
          </P>
        </li>
        <li>
          <P>
            Working internally in an existing team to help work on their
            security backlog, pushing code and interacting with internal
            stakeholders to get issues closed.
          </P>
        </li>
        <li>
          <P>
            Managing multiple engineers as a technical project lead, assisting
            with code reviews, task breakdown, and pairing as well as being the
            point of contact for the client.
          </P>
        </li>
        <li>
          <P>
            Performing code review and guidance for a team that's new to writing
            Elixir.
          </P>
        </li>
      </ul>

      <H2>Interested?</H2>

      <P>
        If there's something here that you might be interested in, I'd be happy
        to <Link to="mailto:chris@cjbell.co">discuss further via email</Link>,
        especially if the project has an Elixir flavor.
      </P>

      <P>I'm happy to also provide references on request, if needed.</P>
    </Content>
  </Layout>
)

export default WorkWithMePage
