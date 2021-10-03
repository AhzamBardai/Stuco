import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import User from './components/user/User.jsx'
import LoginWrapper from './components/Auth/LoginWrapper';
import Signup from './components/Auth/Signup';
import Dashboard from './components/main/Dashboard.jsx';
import { cookie } from './components/custom/utils/cookie';

// material
import { autumn, summer, winter } from './components/custom/utils/autumnTheme';

// context
import useUserContext from './components/custom/contexts/useUserContext';
import { ThemeProvider } from '@mui/material';
import axios from 'axios';



function App() {  

  const { isLoggedIn, setIsLoggedIn, setUser, setAccessToken, url, setToken } = useUserContext()
  const history = useHistory()

  useEffect(() => {
    if(cookie.checkCookie('refresh')) {
      if(cookie.getCookieData('refresh') === undefined) window.alert('cookie undefined you messed up homie')
      setIsLoggedIn(true)
      const token = cookie.getCookieData('refresh')
      axios.post(url + 'users/token', {jwt: token})
        .then(res => {
          setToken(token)
          setAccessToken(res.data.jwt)
          const bearer = `Bearer ${res.data.jwt}`
          axios.get(url + 'users/data', { 'headers': { 'authorization': bearer } })
            .then(res => setUser(res.data))
        })
      // history.push('/dash')
    }
    else {
      setIsLoggedIn(false)
      // history.push('/login')
    }
  }, [history, setAccessToken, setIsLoggedIn, setToken, setUser, url])
  
  return (
    <div className="App">
      <ThemeProvider theme={winter} >
        <Switch>
          { !isLoggedIn && <Route exact path='/login' component={LoginWrapper} />}
          { !isLoggedIn && <Route exact path='/signup' component={LoginWrapper} />}
          {isLoggedIn  && <Route exact path='/dash' component={Dashboard} />}
          {isLoggedIn  && <Route exact path='/settings' component={User} />}
          <Route component={ () => isLoggedIn ? <Dashboard {...history.push('/dash')} /> : <LoginWrapper {...history.push('/login')} />} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
