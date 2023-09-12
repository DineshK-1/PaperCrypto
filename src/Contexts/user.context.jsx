import { useEffect } from "react";
import { createContext, useState } from "react";
import { OnAuthStateChangedListener } from "../Utils/firebase";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setCurrentUser] = useState(null)

    const [refresh, setRefresh] = useState(false);

    const [db_user, setDBUser] = useState({});

    const value = { user, refresh, setRefresh, db_user, setDBUser }

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