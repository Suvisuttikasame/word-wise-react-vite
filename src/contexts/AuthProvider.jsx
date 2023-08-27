import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthen: true };
    case "logout":
      return { ...state, user: null, isAuthen: false };
    default:
      throw new Error("no this action");
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthen } = state;

  function login(username, password) {
    if (username === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthen, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const authContext = useContext(AuthContext);
  return authContext;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuth };
