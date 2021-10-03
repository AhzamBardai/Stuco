import React, { useEffect } from 'react'
import useUserContext from '../custom/contexts/useUserContext'
import axios from "axios";
import { cookie } from '../custom/utils/cookie';

function User() {

    const { user, setUser, url }  = useUserContext()

    const getDate = () => {
      const d = new Date();
      d.setTime(d.getTime() + (5*60*1000));
      return d.toUTCString();
    }
    
    useEffect(() => {
      const getData = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQwOCRaMzVCck4wOFVrenVnODJ4YW1mekF1QktGN254SjA5LnN2MDQ1RWRkSGsuckVmVS8wNEsucSIsImlhdCI6MTYzMjg0NjEwNn0.VQxCzim-UawRzZXZ9kgCzS5coHRZph7BDl7vJYIgGnM'
        const resToken = await axios.post(`${url}users/token`, {jwt: token})
        const bearer = `Bearer ${resToken.data.jwt}`
        const userInfo = await axios.get(`${url}users/data`, { 'headers': { 'authorization': bearer } })
        setUser(userInfo.data)
        !cookie.checkCookie('refresh') && cookie.setCookie('refresh', token, getDate())
      }
      getData()
    }, [setUser])


    return (
        <div>
            {console.log(user)}
        </div>
    )
}

export default User
