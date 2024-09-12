import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth";
import { Form, Button, Card, Container } from "react-bootstrap";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Call the API to register the user
      await registerUser({ name, email, password, password_confirmation });
      setSuccess("Registration successful!");
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
          <Card.Title className="mb-4">Register To Home Challenge</Card.Title>
          <Form onSubmit={handleRegister}>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group controlId="formBasicName" className="py-2 text-start">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="py-2 text-start">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicPasswordConfirm"
              className="py-2 text-start"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password_confirmation}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-75 mt-3"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form>

          <div className="mt-2">
            <p className="m-0">Already have an account?</p>
            <Button
              variant="link"
              as={Link}
              to="/login"
              className="text-primary text-decoration-none"
            >
              Login
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default RegisterPage;
