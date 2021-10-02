import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import User from "../types/User";
import {PlaceContext} from "./PlaceContext";
import {postUser} from "../api/postUser";
import {postUserPoints} from "../api/postUserPoints";

export const AuthContext = React.createContext<{
  user: User;
  login: (tmp: User) => void;
  register: (userName: string) => void;
  logout: () => void;
}>({ user: null, login: () => {}, register: () => {}, logout: () => {} });

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const { save, get, remove } = React.useContext(PlaceContext);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: (tmp: User) => {
            //TODO: Po tych zmianach pierwsze odpalenie expo start -c
            //TODO: Może i tak pytać bazę czy nie ma zmian?
            setUser(tmp);
            get();
        },
        register: (userName: string) => {

            //TODO: ODKOMENTOWAC
            postUser(userName).then( r => {
                setUser(r);
                save(r);
                postUserPoints(r!!.id)
                AsyncStorage.setItem("user", JSON.stringify(r));
            })

/*            const fakeUser: User = { id: 1,  name: "Konrad" };
            setUser(fakeUser);
            save(fakeUser);
            AsyncStorage.setItem("user", JSON.stringify(fakeUser));*/
        },
        logout: () => {
          setUser(null);
          remove();
          AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
