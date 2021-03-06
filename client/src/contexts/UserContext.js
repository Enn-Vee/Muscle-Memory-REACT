import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = React.createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const logIn = async (info) => {

        await axios
          .post("http://localhost:3001/logIn", info, {
              withCredentials:true
            }
          )
          .then((res) => {
            fetchUser();
            
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const fetchUser = async () => {
        try {
            setIsUserLoading(true);
            let userInfo = await axios.get('http://localhost:3001/users/currentUser', {
                withCredentials:true
            });  
            setUser(userInfo.data);
            setIsUserLoading(false);
        }
        catch(err) {
            console.log(err);
        }
    }

    const logOut = async () => {
        await axios.post('http://localhost:3001/logOut', {}, {
            withCredentials: true
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

    const value = { user, fetchUser, logIn, logOut }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;