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
import { Box } from '@mui/system';
import { alpha, useTheme, styled} from '@mui/material/styles';
import { useLocation } from 'react-router-dom';


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
    const loc = useLocation()

    const drawerWidth = (percent) => {
        // eslint-disable-next-line no-restricted-globals
        const scr = screen.width
        return `${scr * Number(`.${percent.substring(0,2)}`)}px`
    }

    return (
        <Box sx={{  display: 'flex', alignItems: 'center', height: '100%', backgroundColor: theme.palette.background.default, width: '100%' }} >
        
        <Box component='div' sx={{ width: { md: drawerWidth('25%'), lg: drawerWidth('20%') } }} >

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
                                sx={{ textDecoration: 'none', color: theme.palette.primary.main, px: { md: 3, lg: 4 }, bg: active ? theme.palette.primary.main : '', '&:hover': { color: hoverColor}, backgroundColor: loc.pathname === `/${item[1].toLowerCase()}` ? alpha(theme.palette.primary.light, .3) : 'none' }} 
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
                            sx={{ textDecoration: 'none', color: theme.palette.primary.main, px: { md: 3, lg: 4 }, bg: active ? theme.palette.primary.main : '', '&:hover': { color: hoverColor}, backgroundColor: loc.pathname === `/${item[1].toLowerCase()}` ? alpha(theme.palette.primary.light, .3) : 'none' }} 
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
        </Box>
        
            {/* <Button sx={{ display: { xs: 'block', md: 'none' }}} onClick={() => setActive(true)}  >Open</Button> */}
            {children}
        </Box>
    )
}
