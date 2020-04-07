import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: {identifier: $identifier, password: $password}) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
