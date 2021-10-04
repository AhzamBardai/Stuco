import React, { createContext, useState, useContext } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    
    // global states
    const url = 'https://plano-stuco.herokuapp.com/api/' 
    const [user, setUser] = useState()
    const [token, setToken] =useState()
    const [accessToken, setAccessToken]  = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [ann, setAnn] = useState()
    const [users, setUsers] = useState()
    const [shifts, setShifts] = useState()
    
    // Make the context object:
    const Provider = {
      url,
      user,
      setUser,
      token,
      setToken,
      accessToken,
      setAccessToken,
      isLoggedIn,
      setIsLoggedIn,
      ann,
      setAnn,
      users,
      setUsers,
      shifts,
      setShifts
    };
    
    // pass the value in provider and return
    return (
        <UserContext.Provider value={Provider}>
            {children}
        </UserContext.Provider>
    )
};

export const { Consumer } = UserContext

export default function useUserContext () {
    return useContext(UserContext)
}
