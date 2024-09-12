import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Form, Button, Card } from "react-bootstrap";
import { getUser, updateUser, resetPassword } from "../api/auth";

const SettingsPage = () => {
  // State for form data
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // State for success and error messages
  const [userUpdateSuccess, setUserUpdateSuccess] = useState("");
  const [userUpdateError, setUserUpdateError] = useState("");
  const [passwordResetSuccess, setPasswordResetSuccess] = useState("");
  const [passwordResetError, setPasswordResetError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setUserUpdateError("");
      setUserUpdateSuccess("");
      setPasswordResetError("");
      setPasswordResetSuccess("");

      try {
        const data = await getUser();
        if (!Name && !email) {
          setName(data.name || "");
          setEmail(data.email || "");
        }
      } catch (err) {
        setUserUpdateError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [Name, email]);

  // Handle user update
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserUpdateError("");
    setUserUpdateSuccess("");

    try {
      const userData = { name: Name };
      const response = await updateUser(userData);
      setUserUpdateSuccess(response.message);
    } catch (error) {
      if (error.details && Object.keys(error.details).length) {
        const validationErrors = Object.values(error.details).flat().join(" ");
        setUserUpdateError(validationErrors);
      } else {
        setUserUpdateError(
          error.message || "Failed to update user information"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordResetError("");
    setPasswordResetSuccess("");

    if (newPassword !== newPasswordConfirmation) {
      setPasswordResetError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const passwordData = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      };
      const response = await resetPassword(passwordData);
      setPasswordResetSuccess(response.message);
      setPasswordResetError(response.error);
    } catch (error) {
      if (error.details && Object.keys(error.details).length) {
        const validationErrors = Object.values(error.details).flat().join(" ");
        setPasswordResetError(validationErrors);
      } else {
        setPasswordResetError(error.message || "Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{ minHeight: "80vh" }}
      >
        <Card className="p-4" style={{ width: "80%" }}>
          <Card.Title className="mb-4">Account Settings</Card.Title>

          {/* Personal Information Section */}
          <Form onSubmit={handleUpdateUser}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Personal Information</Card.Title>

                <Form.Group controlId="formName" className="py-2 text-start">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your full name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="py-2 text-start">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    disabled
                    placeholder="Your email"
                    value={email}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                {userUpdateSuccess && (
                  <div className="text-success mt-2">{userUpdateSuccess}</div>
                )}
                {userUpdateError && (
                  <div className="text-danger mt-2">{userUpdateError}</div>
                )}
              </Card.Body>
            </Card>
          </Form>

          {/* Password Update Section */}
          <Form onSubmit={handleResetPassword}>
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
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formNewPassword"
                  className="py-2 text-start"
                >
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formConfirmPassword"
                  className="py-2 text-start"
                >
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={newPasswordConfirmation}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
                {passwordResetSuccess && (
                  <div className="text-success mt-2">
                    {passwordResetSuccess}
                  </div>
                )}
                {passwordResetError && (
                  <div className="text-danger mt-2">{passwordResetError}</div>
                )}
              </Card.Body>
            </Card>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default SettingsPage;
