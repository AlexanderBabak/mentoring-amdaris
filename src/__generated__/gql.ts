import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation RegisterUser($registerInput: RegisterInput) {\n    registerUser(registerInput: $registerInput) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n":
    types.RegisterUserDocument,
  "\n  mutation LoginUser($loginInput: LoginInput) {\n    loginUser(loginInput: $loginInput) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n":
    types.LoginUserDocument,
  "\n  query GetUserById($id: ID!) {\n    getUserById(ID: $id) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n":
    types.GetUserByIdDocument,
  "\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n":
    types.GetUserByEmailDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation RegisterUser($registerInput: RegisterInput) {\n    registerUser(registerInput: $registerInput) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n",
): (typeof documents)["\n  mutation RegisterUser($registerInput: RegisterInput) {\n    registerUser(registerInput: $registerInput) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation LoginUser($loginInput: LoginInput) {\n    loginUser(loginInput: $loginInput) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n",
): (typeof documents)["\n  mutation LoginUser($loginInput: LoginInput) {\n    loginUser(loginInput: $loginInput) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserById($id: ID!) {\n    getUserById(ID: $id) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n",
): (typeof documents)["\n  query GetUserById($id: ID!) {\n    getUserById(ID: $id) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n",
): (typeof documents)["\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      email\n      id\n      role\n      token\n      username\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
