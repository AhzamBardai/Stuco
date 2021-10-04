import React, { useState, useRef, useEffect, useReducer } from "react";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, } from "@mui/material";
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
import validator from "validator";

const useStyles = makeStyles({
    
    div: {
        height: 500,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

const initial = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    fullNameError: false,
    usernameError: false,
    emailError: false,
    passwordError: false,
    submit: false,
    passVisibility: false
}

const errorList = {
    
}

const signupReducer = (state, action) => {
    switch (action.type) {
        case 'validate':{
            return {
                ...state,
                fullNameError: !( state.fullName !== '' && /[a-zA-z ']+/.test(state.fullName) && validator.isLength(state.fullName, {min: 7, max: 50}) && state.fullName.split(' ').every(item => item.length)),
                emailError: !( state.email !== '' && validator.isEmail(state.email)),
                usernameError: !(state.username !== '' && !/[!@#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/.test(state.username) && validator.isLength(state.username, {min: 5, max: 20})),
                passwordError: !(state.password !== '' && validator.isLength(state.password, {min: 7, max: 40})),
            }
        }
        case 'submit': {
            return { ...state, submit: !(state.fullNameError || state.emailError || state.usernameError || state.passwordError) }
        }
        case 'visible' : {
            return { ...state, passVisibility: true }
        }
        case 'not visible' : {
            return { ...state, passVisibility: false }
        }
        case 'field' : {
            return {
                ...state,
                [action.field] : action.payload
            }
        }
        default:
            return state
    }
}


export default function Signup() {

    const [state, dispatch] = useReducer(signupReducer, initial)

    const { fullName, username, email, password, fullNameError, usernameError, emailError, passwordError, passVisibility, submit, } = state;
    const { setUser, setAccessToken, setToken, url, setIsLoggedIn }  = useUserContext()

    const classes = useStyles();
    
    
    useEffect(() => {
        console.log('hello')
        const empty = () => fullName === '' && username === '' && email === '' && password === ''
        if( !empty() && submit) {
            const obj = {fullName: fullName, username: username, email: email, password: password,}
            console.log(obj, submit)
            axios.post(url + 'users/new', obj)
                .then(res => {
                    if(res.data?.message) window.alert(res.data.message)
                    else {

                        cookie.setCookie('refresh', res.data.refresh, cookie.setDate('half'))
                        setToken(res.data.refresh) 
                        axios.post(url + 'users/token', {jwt: res.data.refresh})
                            .then(res => {
                                if(res.data?.message) window.alert(res.data.message)
                                else {

                                    setAccessToken(res.data.jwt)
                                    const bearer = `Bearer ${res.data.jwt}`
                                    axios.get(url + 'users/data', { 'headers': { 'authorization': bearer } })
                                        .then(res => {
                                            if(res.data?.message) window.alert(res.data.message)
                                            setIsLoggedIn(true)
                                            setUser(res.data)
                                        })
                                }
                            })
                    }
            
                })
        }
    }, [emailError, fullNameError, passwordError, usernameError, submit, fullName, username, email, password])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({ type: 'submit' })
        
        
        
    }


    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.div} >
        <FormControl fullWidth sx={{m:1}} varient='outlined' >
            <InputLabel required > Full Name </InputLabel>
            <OutlinedInput 
                label='Full Name'
                type='text'
                autoFocus
                
                inputProps={{min:5}}
                className={classes.field}
                value={fullName}
                onChange={(e) => dispatch({ type: 'field', field: 'fullName', payload: e.currentTarget.value })}
                error={ fullNameError}
                
            />
            {fullNameError && <FormHelperText>Please enter your full name. Mininum 7 characters required.  </FormHelperText> }
        </FormControl>

        <FormControl fullWidth sx={{m:1}} varient='outlined' >
            <InputLabel required >Email</InputLabel>
            <OutlinedInput 
                label='Email'
                type='email'
                className={classes.field}
                value={ email}
                onChange={(e) => dispatch({ type: 'field', field: 'email', payload: e.currentTarget.value })}
                error={ emailError}
                
            />
            { emailError && <FormHelperText>Please provide a valid email.</FormHelperText> }
        </FormControl>

        <FormControl fullWidth sx={{m:1}} varient='outlined' >
            <InputLabel required >Username</InputLabel>
            <OutlinedInput 
                label='Username'
                type='text'
                className={classes.field}
                value={ username}
                onChange={(e) => dispatch({ type: 'field', field: 'username', payload: e.currentTarget.value })}
                error={ usernameError }
                
            />
            { usernameError && <FormHelperText>Only Alphanumeric(a-z & 0-9), '.' and '-' allowed. Minimum 8 characters required.</FormHelperText> }
        </FormControl>

        <FormControl fullWidth sx={{m:1}} variant="outlined">
            <InputLabel required >Password</InputLabel>
            <OutlinedInput 
                label='Password'
                type={ passVisibility ? 'text' : 'password' }
                className={classes.field}
                value={ password}
                onChange={(e) => dispatch({ type: 'field', field: 'password', payload: e.currentTarget.value }) }
                error={ passwordError }
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton 
                            onClick={() => passVisibility ? dispatch({ type: 'not visible' }) : dispatch({ type: 'visible' })}
                            color='primary'
                            edge='end'
                        >

                            { passVisibility ? <VisibilityIcon  /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            { passwordError && <FormHelperText>Minimum 7 characters required.</FormHelperText> }
        </FormControl>
                
        <Button 
            type='submit' 
            sx={{fontSize: '30px', width: '15rem', alignSelf:'center'}}
            onClick={() => dispatch({ type: 'validate'}) }
            variant= { submit ? 'disabled' :'contained' }
        >
            Register
        </Button>


        
        </form>
    );
}

