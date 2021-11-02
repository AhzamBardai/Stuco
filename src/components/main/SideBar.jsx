import React, { useState } from 'react'
import { Divider, List, ListItem, ListItemIcon, Toolbar, Typography, ListItemText, Drawer, CssBaseline, AppBar, ListItemButton, Button, useMediaQuery, Container } from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import useUserContext from '../custom/contexts/useUserContext'
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';
import { Box, display } from '@mui/system';
import { alpha, useTheme, styled} from '@mui/material/styles';


export default function SideBar({ children }) {

    const { url, user } = useUserContext()
    const theme = useTheme()
    const [active, setActive] = useState(useMediaQuery(theme.breakpoints.up('md')))
    const wid = useMediaQuery(theme.breakpoints.up('md'))
    const hoverColor = theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark 

    const drawerOptions = [
        [<NotificationImportantIcon />, 'Announcements'],
        [<AssessmentIcon />, 'Data'],
        [<DateRangeIcon />, 'Shifts'],
        [<GroupIcon />, 'Members'],
        [<SettingsIcon />, 'Settings'], 
    ]

    return (
        <Container>
        <Drawer
            open={ active }
            onClose={() => setActive(false)}
            variant={ wid ? "permanent" : 'temporary'}
            PaperProps={{
                elevation: 4,
                sx: {
                    width: { xs: '70%', sm: '50%', md: '25%', lg: '20%'},
                    bgcolor: 'background.default',
                    // display: { sm: 'none', md: 'block' }
                }
            }}
            ModalProps={{
                keepMounted: true
            }}
        >
            <Toolbar />
            
            {/* Stuco Logo */}
            
            <List disablePadding component={'div'} >
                {drawerOptions.map((item, ind) => {
                    if(user && user.isAdmin){
                        return (
                            
                            <ListItemButton 
                                key={`${item}-${ind+1}`}
                                component={RouterLink} 
                                to={`/${item[1].toLowerCase()}`}
                                sx={{ textDecoration: 'none', color: theme.palette.primary.main, px: { md: 3, lg: 4 }, bg: active ? theme.palette.primary.main : '', '&:hover': { color: hoverColor} }} 
                            >
                                    <ListItemIcon>
                                        {item[0]}
                                    </ListItemIcon>
                                    <ListItemText disableTypography primary={item[1]} sx={{ fontSize: 20, fontWeight: '350' }} />
                            </ListItemButton>
                        )
                    }
                    else if(item[1] !== 'Members' ) {
                        return (
                            
                            <ListItemButton 
                                key={`${item}-${ind+1}`}
                                component={RouterLink} 
                                to={`/${item[1].toLowerCase()}`}
                                sx={{ textDecoration: 'none', color: theme.palette.primary.main, px: { md: 3, lg: 4 }, bg: active ? theme.palette.primary.main : '', '&:hover': { color: hoverColor} }} 
                            >
                                    <ListItemIcon>
                                        {item[0]}
                                    </ListItemIcon>
                                    <ListItemText disableTypography primary={item[1]} sx={{ fontSize: 20, fontWeight: '350' }} />
                            </ListItemButton>
                        )
                    }
                })}
            </List>
        </Drawer>
        
            {/* <Button sx={{ display: { xs: 'block', md: 'none' }}} onClick={() => setActive(true)}  >Open</Button> */}
            {children}
        </Container>
    )
}
