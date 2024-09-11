import React from "react";
import Footer from "./Footer";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container className="my-5">{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
