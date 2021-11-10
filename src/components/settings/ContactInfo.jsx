import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'


function ContactInfo() {

    const { user, url, textVariant,  setUser } = useUserContext()
    const { fullName, username, contact, email, image, position, darkMode, createdAt, address } = user
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const [edit, setEdit] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(true)
    const [addressChange, setAddressChange] = useState(address)
    const [contactChange, setContactChange] = useState(contact)

    const toggleEdit = (e) => {
        e.preventDefault()
        setEdit(!edit)
        setIsReadOnly(!isReadOnly)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put( url + `users/${user._id}`, { address: addressChange, contact: contactChange })
            .then((res) => {
                console.log(res.data.user)
                window.alert('change successful')
                setUser(res.data.user)
            })
            .catch((e) => window.alert(e))
    }

    return (
        <Container>
                <Stack spacing={3}>

                    <Stack direction='row' justifyContent='space-between' >

                        <Typography variant='body1' color={headingColor} fontSize={19} >
                            Contact Information
                        </Typography>

                        <Switch checked={edit} onChange={toggleEdit} ></Switch>
                    </Stack>

                    <form noValidate autoComplete="off" onSubmit={handleSubmit} >
                    
                        <Stack spacing={2} >

                            <TextField
                                label= 'Street'
                                variant={textVariant}
                                size='small'
                                defaultValue={ address && address.street}
                                sx={{ flexGrow: 1 }}
                                InputProps={{
                                    readOnly: isReadOnly
                                }}
                                onChange={(e) => setAddressChange({...addressChange, street: e.currentTarget.value})}
                            />
                            
                            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} >

                                <TextField
                                    label='City'
                                    variant={textVariant}
                                    size='small'
                                    defaultValue={address && address.city}
                                    sx={{ flexGrow: 1 }}
                                    InputProps={{
                                        readOnly: isReadOnly
                                    }}
                                    onChange={(e) => setAddressChange({...addressChange, city: e.currentTarget.value})}
                                    />
                                    
                                <TextField
                                    label='State'
                                    variant={textVariant}
                                    size='small'
                                    defaultValue={address && address.state}
                                    sx={{ flexGrow: 1 }}
                                    InputProps={{
                                        readOnly: isReadOnly
                                    }}
                                    onChange={(e) => setAddressChange({...addressChange, state: e.currentTarget.value})}
                                    />

                            </Stack>

                            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} >

                                <TextField
                                    label='Zip Code'
                                    variant={textVariant}
                                    size='small'
                                    defaultValue={address && address.zipcode}
                                    sx={{ flexGrow: 1 }}
                                    InputProps={{
                                        readOnly: isReadOnly
                                    }}
                                    onChange={(e) => setAddressChange({...addressChange, zipcode: e.currentTarget.value})}
                                    />
                                    
                                <TextField
                                    label='Phone'
                                    variant={textVariant}
                                    size='small'
                                    defaultValue={contact}
                                    sx={{ flexGrow: 1 }}
                                    InputProps={{
                                        readOnly: isReadOnly
                                    }}
                                    onChange={(e) => setContactChange(e.currentTarget.value)}
                                    />

                            </Stack>

                            <Button variant='contained' fullWidth disabled={!edit} type='submit' >
                                Change Contact Information
                            </Button>

                        </Stack>
                    </form>

            </Stack>

        </Container>
    )
}

export default ContactInfo
