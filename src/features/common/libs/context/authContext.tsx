import React, { createContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { UserResponse } from "../../types/auth";

type Action = { type: "LOGIN"; payload: UserResponse } | { type: "LOGOUT" };

const initialState: { user: UserResponse | null } = {
  user: null,
};

if (localStorage.getItem("token")) {
  // @ts-ignore
  const decodedToken = jwtDecode<JwtPayload>(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData: UserResponse) => {},
  logout: () => {},
});

const authReducer = (state: any, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: UserResponse) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
};

export { AuthProvider, AuthContext };
