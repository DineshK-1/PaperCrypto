import { useEffect } from "react";
import { createContext, useState } from "react";
import { OnAuthStateChangedListener } from "../Utils/firebase";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setCurrentUser] = useState(null)
    var isLoggedIn = (user ? true : false);

    const value = { user, isLoggedIn }

    useEffect(() => {
        const unsubscribe = OnAuthStateChangedListener((user) => {
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}