import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery, FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'
import NameAndAvatar from './NameAndAvatar'
import ContactInfo from './ContactInfo'
import AuthInfo from './AuthInfo'
import DeleteUser from './DeleteUser'
import EditHomeColor from './EditHomeColor'
import DarkMode from './DarkMode'


function EditProfile() {
    
    const { user, url, setDark, dark, homeColorOptions, homeColor, setHomeColor } = useUserContext()
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const landHeight = useMediaQuery('(max-height: 500px)') ? '100vh' : '100%'
    const styles = {
        rootDiv : { display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: {landHeight},
            backgroundColor: theme.palette.background.default,
            overflowY: 'scroll',
            paddingBottom: '50px' 
        }
    }

    // useEffect(() => console.log(theme) ,[])

    if(user){
        const { fullName, username, contact, email, image, position, darkMode, createdAt, address } = user
        return (
            <div style={styles.rootDiv} >
    
                <SideBar />
    
                <Paper elevation={4} sx={{ width: { xs: '100%', sm: '70%', md: '50%'}, mt: '50px' , ml: { md: 10, lg: 6 } }}  >
                    <Container sx={{ py: 3 }} >
                        <Stack spacing={3} justifyContent='flex-start' >

                            <Typography variant='h5' color={headingColor} sx={{ textAlign: 'center' }} >
                                Upate your Information and Preferences here.
                            </Typography>

                            <Divider />
                            
                            <NameAndAvatar />
        
                            <Divider />

                            <ContactInfo />
                            
                            <Divider />

                            <AuthInfo />
                            
                            <Divider />

                            { user && user.isAdmin && <EditHomeColor />}

                            <Divider />

                            <DarkMode />

                            <Divider />
                            
                            {/* ----------------------------------------------------Add avalability----------------------------- */}
                            <Container>
                                <Stack>
                                    <Typography variant='body1' color={headingColor} fontSize={19} >
                                        Change Avalability
                                    </Typography>
                                    
                                </Stack>
                            </Container>

                            <Divider />

                            {/* ----------------------------------------------------Add delete account----------------------------- */}
                            <DeleteUser />


                        </Stack>
                    </Container>
                </Paper>
            </div>
        )

    }
    else {
        return <div></div>
    }
}

export default EditProfile
