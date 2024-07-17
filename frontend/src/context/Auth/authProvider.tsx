import { FC, PropsWithChildren, useEffect, useState } from "react";
import { BASE_URL } from "../../constants/baseURL";
import { AuthContext } from "./authContect";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [myOrders, setMyOrders] = useState([]);
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
  const getMyOrders = async () => {
    const response = await fetch(`${BASE_URL}/user/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return;
    const data = await response.json();
    setMyOrders(data);
  };
  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        login,
        isAuthonticated,
        myOrders,
        logout,
        getMyOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
