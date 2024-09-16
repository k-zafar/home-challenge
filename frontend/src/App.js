import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import NewsViewPage from "./pages/NewsViewPage";
import AuthRedirect from "./components/AuthRedirect";
import PrivateRoute from "./components/PrivateRoute";
import PreferencesPage from "./pages/PreferencesPage";
import NewsArticlesPage from "./pages/NewsArticlesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        <Route path="/news-articles" element={<PrivateRoute element={<NewsArticlesPage />} />} />
        <Route
          path="/login"
          element={<AuthRedirect element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<AuthRedirect element={<RegisterPage />} />}
        />
        <Route
          path="/news-article/:id"
          element={<PrivateRoute element={<NewsViewPage />} />}
        />
        <Route
          path="/user/:id/settings"
          element={<PrivateRoute element={<SettingsPage />} />}
        />
        <Route
          path="/user/:id/preferences"
          element={<PrivateRoute element={<PreferencesPage />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
