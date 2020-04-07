import gql from 'graphql-tag';

const GET_ARTICLES = gql`
  {
    articles {
      id
      title
      content
      published_at
    }
  }
`;

export {GET_ARTICLES};
