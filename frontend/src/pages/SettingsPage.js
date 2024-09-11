import React from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

const SettingsPage = () => {
  const { id } = useParams();

  return (
    <>
      <Layout>
        <div
          className="d-flex justify-content-center align-items-center text-center"
          style={{ minHeight: "80vh" }}
        >
          <Card className="p-4" style={{ width: "80%" }}>
            <Card.Title className="mb-4">Account Settings</Card.Title>

            {/* Personal Information Section */}
            <Form>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Personal Information</Card.Title>

                  <Form.Group
                    controlId="formFullName"
                    className="py-2 text-start"
                  >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Your fullname" />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="py-2 text-start">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      disabled
                      placeholder="Your email"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-3"
                  >
                    Save Changes
                  </Button>
                </Card.Body>
              </Card>

              {/* Password Update Section */}
              <Card>
                <Card.Body>
                  <Card.Title>Update Password</Card.Title>

                  <Form.Group
                    controlId="formCurrentPassword"
                    className="py-2 text-start"
                  >
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Current password"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formNewPassword"
                    className="py-2 text-start"
                  >
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="New password" />
                  </Form.Group>

                  <Form.Group
                    controlId="formConfirmPassword"
                    className="py-2 text-start"
                  >
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-3"
                  >
                    Update Password
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default SettingsPage;
