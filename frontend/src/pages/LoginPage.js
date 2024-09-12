import Cookies from "js-cookie";
import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Call the API to log in the user
      const response = await loginUser({ email, password });
      setSuccess("Login successful!");
      Cookies.set("authToken", response.token, { expires: 1 });
      navigate("/");
    } catch (error) {
      // Check if the error has validation details
      if (error.details && Object.keys(error.details).length) {
        const validationErrors = Object.values(error.details).flat().join(" ");
        setError(validationErrors);
      } else {
        setError(error.message || "An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ height: "80vh" }}
      >
        <Card className="p-4 py-4" style={{ width: "80%" }}>
          <Card.Title className="mb-4">Login To Home Challenge</Card.Title>
          <Form onSubmit={handleLogin}>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group controlId="formBasicEmail" className="py-2 text-start">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              className="py-2 text-start"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-75 mt-3"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <div className="mt-2">
            <p className="m-0">Don't have an account?</p>
            <Button
              variant="link"
              as={Link}
              to="/register"
              className="text-primary text-decoration-none"
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
