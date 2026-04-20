import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

// Components & Pages
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Lazy Loaded Pages
const Bookmarks = lazy(() => import("./pages/Bookmarks"));

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-primary)'}}>Loading App...</div>}>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/bookmarks" 
                element={
                  <ProtectedRoute>
                    <Bookmarks />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <footer className="footer" style={{marginTop: 'auto'}}>
              <span className="footer__brand">PULSE</span>
              <span> · </span>
              Stay informed. Stay ahead.
              <br />
              <span style={{ marginTop: 6, display: "inline-block" }}>
                © {new Date().getFullYear()} PulseNews. All rights reserved.
              </span>
            </footer>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
