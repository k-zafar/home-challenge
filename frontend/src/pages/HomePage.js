import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Header />
      <Container className="mt-4 mb-5">
        <h2 className="text-center">Welcome to the Home Challenge</h2>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
