import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to login: " + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch(err) {
      setError("Failed to sign in with Google: " + err.message);
    }
  };

  return (
    <>
      <Navbar showSearch={false} />
      <div className="auth-container" style={{maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: 'var(--bg-card)', borderRadius: '8px'}}>
        <h2 style={{marginBottom: '1rem'}}>Login to PulseNews</h2>
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <input 
            type="email" 
            placeholder="Email" 
            ref={emailRef}
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)'}}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)'}}
          />
          <button type="submit" className="filter-btn filter-btn--active" style={{padding: '0.75rem', fontSize: '1rem'}}>Login</button>
        </form>
        <div style={{margin: '1rem 0', textAlign: 'center'}}>OR</div>
        <button onClick={handleGoogleSignIn} className="filter-btn" style={{width: '100%', padding: '0.75rem', fontSize: '1rem'}}>Sign in with Google</button>
        <p style={{marginTop: '1rem', textAlign: 'center'}}>
          Don't have an account? <Link to="/signup" style={{color: 'var(--category-technology)'}}>Sign Up</Link>
        </p>
      </div>
    </>
  );
}
