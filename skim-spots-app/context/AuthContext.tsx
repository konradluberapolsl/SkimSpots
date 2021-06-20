import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import User from "../types/User";

export const AuthContext = React.createContext<{
  user: User;
  login: () => void;
  logout: () => void;
}>({ user: null, login: () => {}, logout: () => {} });

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          const fakeUser: User = { id: 0,  name: "test" };
          setUser(fakeUser);
          AsyncStorage.setItem("user", JSON.stringify(fakeUser));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
