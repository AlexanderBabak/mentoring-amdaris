export interface UserResponse {
  id: string;
  email: string;
  username: string;
  password: string;
  role: "user" | "admin";
  token: string;
}

export interface LoginParams extends Pick<UserResponse, "email" | "password"> {}

export interface RegisterParams extends Omit<UserResponse, "role" | "token" | "id"> {
  confirmPassword: string;
}

export type LoginSubmitProps = ({ email, password }: { email: string; password: string }) => void;

export type RegisterSubmitProps = ({ email }: { email: string }) => void;

export type CompleteSubmitProps = ({ password }: { password: string }) => void;
