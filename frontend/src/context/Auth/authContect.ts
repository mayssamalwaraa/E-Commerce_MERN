import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthonticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  login: () => {},
  isAuthonticated: false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
