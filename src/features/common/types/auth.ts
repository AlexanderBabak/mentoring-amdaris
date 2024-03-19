export interface UserResponse {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
  token: string;
}

export interface RegisterParams {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginParams extends Pick<RegisterParams, "email" | "password"> {}
