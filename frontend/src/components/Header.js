import React from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  const isAuthenticated = Cookies.get("authToken") !== undefined;

  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home Challenge
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/news">
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <div className="ms-auto d-flex align-items-center">
              <Button as={Link} to="/user/1/settings" className="me-2">
                Account Settings
              </Button>
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="outline-primary"
              as={Link}
              to="/login"
              className="ms-auto"
            >
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
