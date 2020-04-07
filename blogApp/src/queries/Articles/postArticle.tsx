import gql from 'graphql-tag';

const POST_ARTICLE = gql`
  mutation createArticle(
    $title: String!
    $content: String!
    $published_at: Date!
  ) {
    createArticle(
      input: {
        data: {title: $title, content: $content, published_at: $published_at}
      }
    ) {
      article {
        id
        title
        content
        published_at
      }
    }
  }
`;

export {POST_ARTICLE};
