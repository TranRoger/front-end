import { createContext, useReducer, useEffect } from 'react';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const initialState = {
  user: null,
};

const AuthContext = createContext(null);

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    const savedUser = window.localStorage.getItem("user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({
          type: 'LOGIN',
          payload: user
        });
      } catch (error) {
        window.localStorage.removeItem("user");
        dispatch({
          type: 'LOGOUT'
        });
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      window.localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("user");
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export default AuthProvider;