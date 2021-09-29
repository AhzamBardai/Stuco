import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const getData = async () => {
          const url = "http://localhost:4000/api/users"
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQwOCRaMzVCck4wOFVrenVnODJ4YW1mekF1QktGN254SjA5LnN2MDQ1RWRkSGsuckVmVS8wNEsucSIsImlhdCI6MTYzMjg0NjEwNn0.VQxCzim-UawRzZXZ9kgCzS5coHRZph7BDl7vJYIgGnM'
          const resToken = await axios.post(`${url}/token`, {jwt: token})
          const bearer = `Bearer ${resToken.data.jwt}`
          const user = await axios.get(`${url}/data`, { 'headers': { 'authorization': bearer } })
          console.log(user.data)
          setUser(user.data)
        }
        getData()
      }, [])


    // Make the context object:
    const Provider = {
        user,
        setUser,
    };

    // pass the value in provider and return
    return <UserContext.Provider value={Provider}>{children}</UserContext.Provider>;
};

export const { Consumer } = UserContext

