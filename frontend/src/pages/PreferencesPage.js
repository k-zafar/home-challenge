import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import {
  getCategories,
  getSources,
  getAuthors,
  getUserSources,
  getUserCategories,
  getUserAuthors,
  setUserPreferences,
} from "../api/preferences";

const PreferencesPage = () => {
  // State for data
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  // State for selected items
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // State for form submission
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      try {
        // Fetch categories, sources, and authors
        const [categoriesData, sourcesData, authorsData] = await Promise.all([
          getCategories(),
          getSources(),
          getAuthors(),
        ]);

        // Format data for MultiSelect options
        setCategories(
          categoriesData.map((item) => ({ label: item.name, value: item.id }))
        );
        setSources(
          sourcesData.map((item) => ({ label: item.name, value: item.id }))
        );
        setAuthors(
          authorsData.map((item) => ({ label: item.name, value: item.id }))
        );

        // Fetch user preferences
        const [userSources, userCategories, userAuthors] = await Promise.all([
          getUserSources(),
          getUserCategories(),
          getUserAuthors(),
        ]);

        // Set selected items based on user preferences
        setSelectedSources(
          userSources.map((item) => ({ label: item.name, value: item.id }))
        );
        setSelectedCategories(
          userCategories.map((item) => ({ label: item.name, value: item.id }))
        );
        setSelectedAuthors(
          userAuthors.map((item) => ({ label: item.name, value: item.id }))
        );
      } catch (error) {
        setErrorMessage("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const preferencesData = {
        categories: selectedCategories.map((item) => item.value),
        sources: selectedSources.map((item) => item.value),
        authors: selectedAuthors.map((item) => item.value),
      };
      await setUserPreferences(preferencesData);
      setSuccessMessage("Preferences updated successfully.");
    } catch (error) {
      setErrorMessage("Failed to update preferences.");
      if (error.details && Object.keys(error.details).length) {
        const validationErrors = Object.values(error.details).flat().join(" ");
        setErrorMessage(validationErrors);
      } else {
        setErrorMessage(error.message || "Failed to update preferences");
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
          <Card.Title className="mb-4">Preferences</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Choose Your Preferences to Personalize Your News Feed</Card.Title>

                {/* Categories MultiSelect */}
                <Form.Group
                  controlId="formCategories"
                  className="py-2 text-start"
                >
                  <Form.Label>Categories</Form.Label>
                  <MultiSelect
                    options={categories}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    labelledBy="Select Categories"
                    overrideStrings={{ selectSomeItems: "Select categories" }}
                  />
                </Form.Group>

                {/* Sources MultiSelect */}
                <Form.Group controlId="formSources" className="py-2 text-start">
                  <Form.Label>Sources</Form.Label>
                  <MultiSelect
                    options={sources}
                    value={selectedSources}
                    onChange={setSelectedSources}
                    labelledBy="Select Sources"
                    overrideStrings={{ selectSomeItems: "Select sources" }}
                  />
                </Form.Group>

                {/* Authors MultiSelect */}
                <Form.Group controlId="formAuthors" className="py-2 text-start">
                  <Form.Label>Authors</Form.Label>
                  <MultiSelect
                    options={authors}
                    value={selectedAuthors}
                    onChange={setSelectedAuthors}
                    labelledBy="Select Authors"
                    overrideStrings={{ selectSomeItems: "Select authors" }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Preferences"}
                </Button>

                {successMessage && (
                  <div className="text-success mt-2">{successMessage}</div>
                )}
                {errorMessage && (
                  <div className="text-danger mt-2">{errorMessage}</div>
                )}
              </Card.Body>
            </Card>
          </Form>
        </Card>
      </div>
    </Layout>
  );
};

export default PreferencesPage;
