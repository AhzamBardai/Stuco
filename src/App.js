import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import LoginWrapper from './components/Auth/LoginWrapper';
import Dashboard from './components/main/Dashboard.jsx';
import SideBar from './components/main/SideBar';
import { cookie } from './components/custom/utils/cookie';

// material
import { autumn, christmas, spring, summer, test, winter } from './components/custom/utils/autumnTheme';

// context
import useUserContext from './components/custom/contexts/useUserContext';
import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import Announcements from './components/announcements/Announcements';
import Shifts from './components/shifts/Shifts';
import MemberList from './components/member/MemberList';
import EditProfile from './components/settings/EditProfile';
import moment from 'moment';
import getSeason from './components/custom/utils/getSeason';
import customTheme from './components/custom/utils/theme';



function App() {  

  const { isLoggedIn, setIsLoggedIn, setUser, setAccessToken, url, setToken, dark, user, setDark, setHomeColor, setHomeColorOptions, homeColor, currentTheme, getTheme, setDarkMode, changeTextVariant } = useUserContext()
  const history = useHistory()
  const darkMode = dark ? 'dark' : 'light'
  // const season = moment()

  useEffect(() => {
    !currentTheme && getTheme()
    setDarkMode()
    changeTextVariant()
    if(cookie.checkCookie('refresh')) {
      setIsLoggedIn(true)
      const token = cookie.getCookieData('refresh')
      axios.post(url + 'users/token', {jwt: token})
        .then(res => {
          setToken(token)
          setAccessToken(res.data.jwt)
          const bearer = `Bearer ${res.data.jwt}`
          axios.get(url + 'users/data', { 'headers': { 'authorization': bearer } })
            .then(res => {
              setUser(res.data)
              setHomeColor(res.data.homeColor)
              setHomeColorOptions(res.data.colorOptions)
            })
        })
      // history.push('/dash')
    }
    else {
      setIsLoggedIn(false)
    }
  }, [history, setAccessToken, setIsLoggedIn, setToken, setUser, url])

  // useEffect(() => {
  //   getColorOption(homeColor)
  // }, [ homeColor ])

  // const getColorOption = (option) => {
  //     switch (option) {
  //       case 'autumn':
  //         return autumn(darkMode)
  //       case 'summer':
  //         return summer(darkMode)
  //       case 'spring':
  //         return spring(darkMode)
  //       case 'winter':
  //         return winter(darkMode)
  //       case 'christmas':
  //         return christmas(darkMode)
  //       default:
  //         return autumn(darkMode)
  //     }
    
  // }
  // user ? getColorOption(homeColor) : getColorOption(getSeason(season.month()))
  
  if(currentTheme){
    return (
      <div>
        <ThemeProvider theme={customTheme(darkMode, currentTheme)} >
          <Switch>
            { !isLoggedIn && <Route exact path='/login' component={LoginWrapper} /> }
            { !isLoggedIn && <Route exact path='/signup' component={LoginWrapper} />}
            {isLoggedIn  && <Route exact path='/announcements' component={Announcements} />}
            {isLoggedIn  && <Route exact path='/settings' component={EditProfile} />}
            {isLoggedIn  && <Route exact path='/shifts' component={Shifts} />}
            {isLoggedIn  && <Route exact path='/members' component={MemberList} />}
            {isLoggedIn  ? <Route exact path='*' component={() => <Announcements {...history.push('/announcements')} />} /> : <Route exact path='*' component={() => <LoginWrapper {...history.push('/login')} />} /> }
            {/* <Route component={ () => isLoggedIn ? <Announcements {...history.push('/announcements')} /> : <LoginWrapper {...history.push('/login')} />} /> */}
          </Switch>
        </ThemeProvider>
      </div>
    );

  } 
  else {
    return <div></div>
  }
}

export default App;
