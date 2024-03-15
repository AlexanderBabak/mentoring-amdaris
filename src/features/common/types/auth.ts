export interface UserResponse {
  email: string;
  lastName: string;
  name: string;
  password: string;
  workspaceName: string;
}

export interface LoginParams extends Pick<UserResponse, "email" | "password"> {}

export interface RegisterParams extends Pick<UserResponse, "email" | "workspaceName"> {}

export interface RegisterCompleteParams extends Pick<UserResponse, "name" | "password" | "lastName"> {
  repeatPassword: string;
}

export type LoginSubmitProps = ({ email, password }: { email: string; password: string }) => void;

export type RegisterSubmitProps = ({ email }: { email: string }) => void;

export type CompleteSubmitProps = ({ password }: { password: string }) => void;
