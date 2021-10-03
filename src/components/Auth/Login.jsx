import React, { useState } from "react";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import { makeStyles } from "@mui/styles";
import axios from "axios";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import useUserContext from "../custom/contexts/useUserContext";
import { cookie } from "../custom/utils/cookie";
import { useHistory } from "react-router";

const useStyles = makeStyles({
    
    div: {
        height: 300,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});


export default function Login() {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isUsername, setIsUsername] = useState(true)
    const [passVisibility, setPassVisibility] = useState(false)
    const classes = useStyles();

    const handleSubmit = (e) => {
    e.preventDefault()
    setPasswordError(false)
    setUsernameError(false)
        isUsername ? username === '' && setUsernameError(true) : email === '' && setEmailError(true)
    password === '' && setPasswordError(true)
    if(password !== '' &&  (isUsername ? username !== '' : email !== '')){
        // const url = "http://localhost:4000/api/users"
        // axios.post(url+'login', )
        console.log(username, password)
        getData()
    }
    }

    const { setUser, setAccessToken, setToken, url, setIsLoggedIn }  = useUserContext()
    const history = useHistory()
    const getData = () => {
    const user = isUsername ? { username: username, password: password } : { email: email, password: password }
    console.log(user)
    axios.post(url + 'users/login', user)
        .then(res => {
            if(res.data?.message) window.alert(res.data.message)
            else{
                setAccessToken(res.data.jwt)
                setToken(res.data.refresh)
                cookie.setCookie('refresh', res.data.refresh, cookie.setDate('half') )
                const bearer = `Bearer ${res.data.jwt}`
                axios.get(url + 'users/data', { 'headers': { 'authorization': bearer } })
                    .then(res => {
                        setUser(res.data)
                        setIsLoggedIn(true)
                        history.push('/dash')
                    })

            }
        })
    }

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.div} >
        <FormControl fullWidth sx={{m:1}} varient='outlined' >
            <InputLabel required >{isUsername ? 'Username' : 'Email'}</InputLabel>
            <OutlinedInput 
                label={isUsername ? 'Username' : 'Email'}
                type={isUsername ? 'text' : 'email' }
                autoFocus
                className={classes.field}
                value={ isUsername ? username : email}
                onChange={(e) => isUsername ? setUsername(e.target.value) : setEmail(e.target.value)}
                error={ isUsername ? usernameError : emailError }
                endAdornment={
                    <InputAdornment position='end'> 
                        <IconButton 
                            edge='end'
                            color='primary'
                            onClick={() => setIsUsername(!isUsername)}
                        > 
                            {isUsername ? <AlternateEmailIcon /> : <TextFieldsIcon />  }
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
        <FormControl fullWidth sx={{m:1 }} variant="outlined">
            <InputLabel required >Password</InputLabel>
            <OutlinedInput 
                label='Password'
                type={ passVisibility ? 'text' : 'password' }
                className={classes.field}
                value={ password}
                onChange={(e) => setPassword(e.target.value) }
                error={passwordError }
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton 
                            onClick={() => setPassVisibility(!passVisibility)}
                            color='primary'
                            edge='end'
                        >

                            { passVisibility ? <VisibilityIcon  /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
                
        <Button 
            type='submit' 
            size='large'
            sx={{fontSize: '30px', width: '15rem', alignSelf:'center'}}
            variant='contained'
        >login</Button>


        
        </form>
    );
}

