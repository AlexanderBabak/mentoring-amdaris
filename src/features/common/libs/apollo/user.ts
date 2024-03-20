import { gql } from "../../../../__generated__";

export const REGISTER_USER = gql(`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      id
      role
      token
      username
    }
  }
`);

export const LOGIN_USER = gql(`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      id
      role
      token
      username
    }
  }
`);

export const GET_USER_BY_ID = gql(`
  query GetUserById($id: ID!) {
    getUserById(ID: $id) {
      email
      id
      role
      token
      username
    }
  }
`);

export const GET_USER_BY_EMAIL = gql(`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      email
      id
      role
      token
      username
    }
  }
`);
