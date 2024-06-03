import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "../config/firebase"; 
import { onAuthStateChanged } from "firebase/auth";


interface UserData {
  uid: string;
  email: string;
}

interface AuthContextProps {
  user: UserData | null;
  loading: boolean;
  error: Error | null;
  isLoggedIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    error: null,
    isLoggedIn: false,
  });

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            setUser({ uid: user.uid, email: user.email });
            setLoading(false);
          } else {
            setUser(null);
            setLoading(false);
          }
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  
      return () => unsubscribe();
    }, []);
  
    const isLoggedIn = !!user;
  
    return (
      <AuthContext.Provider value={{ user, loading, error, isLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
