import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./authContect";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUserName] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (username: string, token: string) => {
    setUserName(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };
  const isAuthonticated = !!token;

  return (
    <AuthContext.Provider value={{ username, token, login, isAuthonticated }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
