import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Divider, FormHelperText, Paper, Stack, Switch, TextField, Typography, useMediaQuery, FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import SideBar from '../main/SideBar'
import axios from 'axios'
import useUserContext from '../custom/contexts/useUserContext'
import { useTheme } from '@mui/material/styles'
import moment from 'moment'

function EditHomeColor() {

    const { user, url, setDark, dark, homeColorOptions, homeColor, setHomeColor } = useUserContext()
    const theme = useTheme()
    const headingColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark
    const landHeight = useMediaQuery('(max-height: 500px)') ? '100vh' : '100%'
    const [edit, setEdit] = useState(false)
    const [addColor, setAddColor] = useState(false)

    const handleAddColor = () => {
        if(addColor){
            setAddColor(false)
        }
        else {
            setAddColor(true)
        }
    }

    if( homeColorOptions ){
        return (
            <Container>
                <Stack spacing={3} >
                    <Stack direction='row' justifyContent='space-between' >
                        <Typography variant='body1' color={headingColor} fontSize={19} sx={{flexShrink: 1}} >
                            Change Home Color
                        </Typography>
                        <Switch checked={edit} onChange={() => setEdit(!edit)} ></Switch>
                    </Stack>
                    <FormControl sx={{ flexGrow: 1 }} >
                        <Select
                            value={homeColor.charAt(0) + homeColor.substring(1)}
                            label="Options"
                            onChange={(e) => setHomeColor(e.target.value)}
                            disabled={!edit}
                        >
            
                            { homeColorOptions.map(item => <MenuItem value={item} key={item} sx={{ textTransform: 'capitalize' }} > {item} </MenuItem>  )}
                        
                        </Select>
                        <FormHelperText>This will change the home color for all users.</FormHelperText>
                    </FormControl>
                    { addColor && (
                        <form>
                            <TextField

                            />
                        </form>
                    )}

                    <Button variant='contained' fullWidth disabled={!edit} onClick={handleAddColor} >
                            { addColor ? 'Save Color' : "Add New Theme"}
                    </Button>
                </Stack>
            </Container>
        )
    }
    else {
        return <div></div>
    }
}

export default EditHomeColor
