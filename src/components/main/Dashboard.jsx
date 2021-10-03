import React,{ useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Box, Toolbar, AppBar, Typography, Avatar, Tab, Tabs, Button, Popover, Link  } from '@mui/material'
import Nav from './Nav'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles';
import useUserContext from '../custom/contexts/useUserContext'
import { cookie } from '../custom/utils/cookie'


const useStyles = makeStyles({
    
})

function Dashboard() {
    const [anchorEl, setAnchorEl] = useState(null)
    const theme = useTheme()
    const classes = useStyles()
    const { user } = useUserContext()

    return (
        <Box sx={{height: '100vh', display: 'flex', flexDirection: 'column'}} >

            <AppBar elevation={0} position='static' >
                <Toolbar sx={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between'}}  >
                    <Typography>

                        Hello, {user?.fullName}
                    </Typography>
                    <Avatar
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{cursor: 'pointer'}}
                    >
                    </Avatar>
                    <Popover 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        sx={{mt: '5px', mr: '20px'}}
                    >
                        <Link href='/login' sx={{textDecoration: 'none'}} onClick={() => cookie.setCookie('refresh', user.token, cookie.setDate('delete')) } >
                           <Typography variant='body1' sx={{padding: '10px 20px', cursor:'pointer', textDecoration: 'none', borderBottom: 1, borderColor:'divider'}} >
                                
                                    Logout 
                            </Typography>
                        </Link>
                        <Link href='/settings' sx={{textDecoration: 'none'}} >
                           <Typography variant='body1' sx={{padding: '10px 20px', cursor:'pointer', textDecoration: 'none'}} >
                                
                                    Settings 
                            </Typography>
                        </Link>
                        </Popover>
                </Toolbar>
            </AppBar>
            
            <Nav />

        </Box>
    )
}

export default Dashboard
