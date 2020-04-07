import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(input: {username: $username, email: $email, password: $password}) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
