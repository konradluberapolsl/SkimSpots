import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import UserPlace from "../types/UserPlace";
import User from "../types/User";
import {getUserPlacesByUserID} from "../api/getUserPlacesByUserID";


export const PlaceContext = React.createContext<{
    userPlaces: UserPlace[];
    get: () => void;
    save: (user: User) => void;
    remove: () => void;
}>({ userPlaces: [], save: () => {}, get: () => {}, remove: () => {} });

export const PlaceProvider: React.FC = ({ children }) => {
    const [userPlaces, setUserPlaces] = useState<UserPlace[]>([]);
    return (
        <PlaceContext.Provider
            value={{
                userPlaces,
                get: () => {
                    //TODO: Może i tak pytać bazę czy nie ma zmian? - porównywać odpowiedz z JSONem
                    AsyncStorage.getItem("userPlaces").then(upString => {
                        setUserPlaces(JSON.parse(upString!!));
                    });
                },
                save: (user: User) => {
                    // TODO: Nawet jak nie ma user to i tak API zwróci []
                    let temp: UserPlace[];
                    getUserPlacesByUserID(user!!.id).then( r => {
                        temp = r;
                        setUserPlaces(temp);
                        AsyncStorage.setItem("userPlaces", JSON.stringify(temp));
                    } )

                },
                remove: () => {
                    setUserPlaces([]);
                    AsyncStorage.removeItem("userPlaces");
                }
            }}
        >
            {children}
        </PlaceContext.Provider>
    );
};