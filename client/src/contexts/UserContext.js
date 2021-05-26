import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const  fetchUser = async () => {
        try {
            let userInfo = await axios.get('http://localhost:3001/user', {
            withCredentials:true
            });
            setUser(userInfo.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    const logOut = async () => {
        await axios.get('http://localhost:3001/logout', {
            withCredentials:true
        })
        .then(res => {
            fetchUser();
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const value = { user, fetchUser, logOut }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;