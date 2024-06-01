import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "../config/firebase"; // Importe seu módulo de configuração do Firebase
import { onAuthStateChanged, User } from "firebase/auth";

// Definindo um tipo para os dados do usuário
interface UserData {
  uid: string;
  email: string;
  // Adicione outras propriedades do usuário conforme necessário
}

// Definindo um tipo para o contexto de autenticação
interface AuthContextProps {
  user: UserData | null;
  loading: boolean;
  error: Error | null;
  isLoggedIn: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    error: null,
    isLoggedIn: false, // Adicionando a propriedade 'isLoggedIn' com valor padrão 'false'
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
  
    // Derivar 'isLoggedIn' de 'user'
    const isLoggedIn = !!user;
  
    return (
      <AuthContext.Provider value={{ user, loading, error, isLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
