import { useState, useRef, useEffect } from "react";
import { auth, createUserWithEmailAndPassword } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to create account: " + err.message);
    }
  };

  return (
    <>
      <Navbar showSearch={false} />
      <div className="auth-container" style={{maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: 'var(--bg-card)', borderRadius: '8px'}}>
        <h2 style={{marginBottom: '1rem'}}>Sign Up for PulseNews</h2>
        {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
        <form onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <input 
            type="email" 
            placeholder="Email" 
            ref={emailRef}
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-default)', color: 'var(--text-primary)'}}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-default)', color: 'var(--text-primary)'}}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-default)', color: 'var(--text-primary)'}}
          />
          <button type="submit" className="filter-btn filter-btn--active" style={{padding: '0.75rem', fontSize: '1rem'}}>Sign Up</button>
        </form>
        <p style={{marginTop: '1rem', textAlign: 'center'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--category-technology)'}}>Login</Link>
        </p>
      </div>
    </>
  );
}
