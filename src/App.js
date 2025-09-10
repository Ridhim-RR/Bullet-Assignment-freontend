import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import MovieGrid from "./MovieGrid";
import Login from "./login";
import Dashboard from "./Dashboard";
import AuthForm from "./login";

// Auth hook: checks for token in localStorage
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));

  // Keep state in sync with localStorage (handles reloads)
  useEffect(() => {
    const checkToken = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  // After a successful login - call with JWT
  const login = useCallback((token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  }, []);

  // Remove token and unauthenticate
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}

// Private route wrapper
function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  const auth = useAuth();

  return (
    <Router>
      <Routes>
        {/* Login Page - Public */}
        <Route path="/" element={<AuthForm login={auth.login} />} />
        <Route path="/login" element={<AuthForm login={auth.login} />} />
        {/* Private Route (auth only) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={auth.isAuthenticated}>
              <Dashboard logout={auth.logout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/list"
          element={
            <PrivateRoute isAuthenticated={auth.isAuthenticated}>
              <MovieGrid />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
