import React from "react";
import Layout from "../components/Layout";
import { Container, Row, Col } from "react-bootstrap";

const AboutUsPage = () => {
  return (
    <Layout>
      <Container className="my-5">
        <h1 className="text-center mb-4">About Home Challenge</h1>
        <Row>
          <Col md={12} className="mb-4">
            <h2>Our Mission</h2>
            <p>
              At Home Challenge, we are dedicated to bringing you the latest
              news from a variety of trusted sources, all in one place. Our
              mission is to provide a comprehensive news platform that
              aggregates top stories and updates from NewsAPI, The Guardian, and
              The New York Times, making it easier for you to stay informed and
              engaged with the world.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mb-4">
            <h2>Our Vision</h2>
            <p>
              We envision a platform where users can effortlessly access diverse
              news content, empowering them to make informed decisions and gain
              multiple perspectives on current events. Home Challenge aims to
              bridge the gap between various news sources, fostering a more
              informed and connected community.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AboutUsPage;
