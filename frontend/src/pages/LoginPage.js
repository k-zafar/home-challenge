import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container className="my-5">
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: "80vh" }}
      >
        <Card className="p-4 py-4" style={{ width: "80%" }}>
          <Card.Title className="mb-4 ">Login To Home Challenge</Card.Title>
          <Form>
            <Form.Group controlId="formBasicEmail" className="py-2 text-start">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Your email" />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              className="py-2 text-start"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Your Password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-75 mt-3">
              Login
            </Button>
          </Form>
          <div className="mt-2">
            <p className="m-0">Don't have an account?</p>
            <Button
              variant="link"
              as={Link}
              to="/register"
              className="text-primary text-decoration-none "
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage;
