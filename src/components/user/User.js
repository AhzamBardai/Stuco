import React, { useContext } from 'react'
import { UserContext } from '../context/Context'

function User() {

    const { user }  = useContext(UserContext)

    return (
        <div>
            {console.log(user)}
        </div>
    )
}

export default User
