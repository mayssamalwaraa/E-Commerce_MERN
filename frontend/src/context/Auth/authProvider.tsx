import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./authContect";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUserName] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const isAuthonticated = !!token;
  const login = (username: string, token: string) => {
    setUserName(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };
  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUserName(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ username, token, login, isAuthonticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
