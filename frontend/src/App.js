import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import PreferencesPage from "./pages/PreferencesPage";
import NewsViewPage from "./pages/NewsViewPage";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute element={<HomePage />} />}  />
        <Route path="/news-article/:id" element={<PrivateRoute element={<NewsViewPage />} />} />
        <Route path="/user/:id/settings" element={<PrivateRoute element={<SettingsPage />} />} />
        <Route path="/user/:id/preferences" element={<PrivateRoute element={<PreferencesPage />} />} />
      </Routes>
    </Router>
  );
};

export default App;
