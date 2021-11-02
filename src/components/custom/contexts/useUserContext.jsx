import React, { createContext, useState, useContext } from "react";
import { cookie } from "../utils/cookie";
import axios from "axios";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {

    const url = process.env.NODE_ENV === 'production' ? 'https://stuco-backend.herokuapp.com/api/' : 'http://localhost:4000/api/'
    
    // global states
    const [user, setUser] = useState()
    const [token, setToken] =useState()
    const [accessToken, setAccessToken]  = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [ann, setAnn] = useState()
    const [users, setUsers] = useState()
    const [shifts, setShifts] = useState()
    const [dark, setDark] = useState(false)
    const [homeColor, setHomeColor] = useState('')
    const [homeColorOptions, setHomeColorOptions] = useState()
    const [currentTheme, setCurrentTheme] = useState()
    const [textVariant, setTextVariant] = useState('')
    
    const getTheme = async () => axios.get(url + 'themes/current').then((res) => setCurrentTheme(res.data))

    const setDarkMode = () => {
        if(!window.localStorage.getItem('dark')){
            window.localStorage.setItem('dark', false)
            setDark(window.localStorage.getItem('dark') === 'true')
        }
        else {
            setDark(window.localStorage.getItem('dark') === 'true')
        }
    }
    
    const changeTextVariant = () => {
        const textType = dark ? 'standard' : 'filled' 
        setTextVariant(textType)
    }

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
      setShifts,
      dark,
      setDark,
      homeColor,
      setHomeColor,
      homeColorOptions,
      setHomeColorOptions,
      currentTheme,
      setCurrentTheme,
      getTheme,
      setDarkMode,
      textVariant,
      setTextVariant,
      changeTextVariant
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
