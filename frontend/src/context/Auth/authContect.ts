import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  isAuthonticated: boolean;
}
export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  login: () => {},
  isAuthonticated: false,
});

export const useAuth = () => useContext(AuthContext);
