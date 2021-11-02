import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery, FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'

function DarkMode() {

    const { user, url, setDark, dark, homeColorOptions, homeColor, setHomeColor, setTextVariant, changeTextVariant } = useUserContext()
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const landHeight = useMediaQuery('(max-height: 500px)') ? '100vh' : '100%'

    const toggleDarkMode = () => {
        setDark(!dark)
        window.localStorage.setItem('dark', !dark)
        changeTextVariant()
    }

    return (
        <Container>
            <Stack direction='row' justifyContent='space-between' alignItems='center' >
                <Typography variant='body1' color={headingColor} fontSize={19} >
                    Toggle Dark Mode
                </Typography>
                <Switch checked={dark} onChange={toggleDarkMode}  />
            </Stack>
        </Container>
    )
}

export default DarkMode
