import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavMenu from './components/NavMenu';
import { clearToken, getToken } from './helpers/token';
import axios from 'axios';
import { PrivateRoute } from './components/PrivateRoute';
import NotFound from './components/NotFound';
import CreateConvo from './components/CreateConvo';
import ListConvos from './components/ListConvos';
import Convo from './components/Convo';

function App() { 
  const [isAuth, setIsAuth] = useState(false);

  const setAuth = (state: boolean) => {
    setIsAuth(state);
  }

  const checkAuth = async () => {
    const token = getToken();
    if(!token) {
      return;
    }

    try {
      axios.get('http://localhost:1234/users/verify', 
      {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then((response) => {
          if(response.status === 200) {
            setAuth(true);
          }
      })
    } catch (error: string | any) {
        clearToken();
        console.log(`I caught this : ${error.response.data.message}`);
    } finally {
    }
  }

  useEffect(() => {
    checkAuth();
  }, [isAuth]);

  return (
      <Router>
        <NavMenu isAuth={isAuth} setIsAuth={setIsAuth} />

          <Routes>

            <Route element={<PrivateRoute isAuth={isAuth} setAuth={setAuth}/>}>
              <Route path='/' element={<Home />} />
              <Route path='/new-chat' element={<CreateConvo />} />
              <Route path='/settings' element={<Home />} />
              <Route path='/all-chats' element={<ListConvos />} />
              <Route path='/conversations/:convoId/:userId' element={<Convo />} />
            </Route>

            <Route
              path="/signin"
              element={isAuth ? <Navigate to="/" /> : <Login setIsAuth={setIsAuth} />}
            />
          
          <Route
            path="/signup"
            element={isAuth ? <Navigate to="/" /> : <SignUp />}
          />
          
          <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>        
  );
}

export default App;
