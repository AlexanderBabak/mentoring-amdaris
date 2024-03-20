import React, { createContext, useContext, useReducer } from "react";
import { useQuery } from "@apollo/react-hooks";
import { jwtDecode } from "jwt-decode";
import { GetUserByIdQuery, LoginUserMutation, User } from "../../../../__generated__/graphql";
import { GET_USER_BY_ID } from "../../libs/apollo/user";

export interface UserContextType {
  user: GetUserByIdQuery["getUserById"] | null;
  isAdmin: boolean;
  login: (userData: LoginUserMutation["loginUser"]) => {};
  logout: () => {};
}

type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };
type UserState = Pick<UserContextType, "user">;

const initialState: UserState = {
  user: null,
};
export const UserContext = createContext({} as UserContextType);

const authReducer = (state: UserState, action: Action) => {
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

export const UserProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  let decodedToken;
  if (localStorage.getItem("token")) {
    // @ts-ignore
    decodedToken = jwtDecode<JwtPayload>(localStorage.getItem("token"));
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      decodedToken = null;
    }
  }

  const { data } = useQuery(GET_USER_BY_ID, {
    variables: { id: decodedToken?.user_id },
    fetchPolicy: decodedToken?.user_id ? "cache-and-network" : "standby",
  });

  if (data?.getUserById) {
    initialState.user = data.getUserById;
  }

  const login = (userData: User) => {
    if (userData?.token) {
      localStorage.setItem("token", userData?.token);
      dispatch({
        type: "LOGIN",
        payload: userData,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const isAdmin = state?.user?.role === "admin";

  return (
    <UserContext.Provider value={{ user: state.user, login, logout, isAdmin }} {...props}>
      {props.children}
    </UserContext.Provider>
  );
};

const useGetUser = () => useContext(UserContext);

export default useGetUser;
