import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { auth, signOut } from "../services/firebase";

export default function Navbar({ searchQuery, setSearchQuery, showSearch = true }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch(err) {
      console.error("Logout error", err);
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <Link to="/" className="navbar__brand" style={{textDecoration: 'none'}}>
        <span className="navbar__logo">PULSE</span>
        <span className="navbar__tagline">news</span>
      </Link>

      {showSearch && (
        <div className="search" id="search-bar">
          <span className="search__icon">🔍</span>
          <input
            id="search-input"
            className="search__input"
            type="text"
            placeholder="Search headlines…"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            aria-label="Search headlines"
          />
          <button
            className={`search__clear ${searchQuery ? "search__clear--visible" : ""}`}
            onClick={() => setSearchQuery && setSearchQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/bookmarks" style={{color: 'var(--text-primary)', textDecoration: 'none'}}>Bookmarks</Link>
            <button onClick={handleLogout} className="filter-btn" style={{padding: '4px 12px', fontSize: '0.9rem'}}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="filter-btn" style={{padding: '4px 12px', fontSize: '0.9rem', textDecoration: 'none'}}>Login</Link>
        )}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          id="theme-toggle"
        >
          <span className="theme-toggle__icon">
            {theme === "dark" ? "☀️" : "🌙"}
          </span>
        </button>
      </div>
    </nav>
  );
}
