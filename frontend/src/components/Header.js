import { getUser } from "../api/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/tokenUtils";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        setUserData(data || {});
      } catch (err) {}
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    removeToken("authToken");
    navigate("/login");
  };

  const isAuthenticated = getToken("authToken") !== "";

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
              News Feed
            </Nav.Link>
            <Nav.Link as={Link} to="/news-articles">
              Search
            </Nav.Link>
          </Nav>
          {(isAuthenticated && userData) ? (
            <div className="ms-auto d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  {userData.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/user/${userData.id}/settings`}>
                    Account Settings
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to={`/user/${userData.id}/preferences`}>
                    Preferences
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
