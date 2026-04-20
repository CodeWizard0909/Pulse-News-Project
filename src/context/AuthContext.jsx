import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Fallback: forcefully stop loading if Firebase hangs after 1.5s (due to fake keys)
    const fallbackTimer = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1500);

    const unsubscribe = onAuthStateChanged(
      auth, 
      (currentUser) => {
        if (!isMounted) return;
        clearTimeout(fallbackTimer);
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state error:", error);
        if (isMounted) {
          clearTimeout(fallbackTimer);
          setLoading(false);
        }
      }
    );
    
    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-primary)'}}>Connecting to Firebase Auth...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
