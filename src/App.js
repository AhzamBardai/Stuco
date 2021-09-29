import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import User from './components/user/User'

// context
import { UserContextProvider } from './components/context/Context';

function App() {  

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IiQyYiQwOCRaMzVCck4wOFVrenVnODJ4YW1mekF1QktGN254SjA5LnN2MDQ1RWRkSGsuckVmVS8wNEsucSIsImlhdCI6MTYzMjg0NjEwNn0.VQxCzim-UawRzZXZ9kgCzS5coHRZph7BDl7vJYIgGnM'
    const d = new Date();
    d.setTime(d.getTime() + (3*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "refresh=" + token + ";" + expires + ";path=/";

  }, [])

  return (
    <div className="App">
      <UserContextProvider >
         <Route exact path='/user' component={User} />
      </UserContextProvider>
    </div>
  );
}

export default App;
