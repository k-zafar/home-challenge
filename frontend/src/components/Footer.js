import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 fixed-bottom">
      <Container>
        <Row>
          <Col>
            <p className="mb-0">&copy; 2024 Home Challenge</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
