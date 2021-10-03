import React,{ useState } from 'react'
import { Tab, Box, Typography, Tabs, Container, AppBar } from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import { makeStyles } from '@mui/styles'
import useUserContext from '../custom/contexts/useUserContext'

const useStyle = makeStyles({
  tab: {
    marginLeft: '50px',
  }
})

function Nav() {

  const { user } = useUserContext()

  const classes = useStyle()

    const [value, setValue] = useState('1');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'h1'}}>
        <TabContext value={value}>
        <AppBar  color='transparent' position='static' elevation={5} sx={{flexGrow: 1 }} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
              <Tab label="Dash" value="1" className={classes.tab} sx={{ml: 3, padding: '20px 40px'}} />
              <Tab label="Shifts" value="2"  className={classes.tab} sx={{ml: 3, padding: '20px 40px'}}/>
              { user?.isAdmin && <Tab label="Members" value="3"  className={classes.tab} sx={{ml: 3, padding: '20px 40px'}}/>}
            </TabList>
          </Box>
          </AppBar>

          <TabPanel value="1">Dash</TabPanel>
          <TabPanel value="2">Shifts</TabPanel>
          {user?.isAdmin && <TabPanel value="3">Members</TabPanel>}
        </TabContext>
      </Box>
    );
  }

export default Nav
