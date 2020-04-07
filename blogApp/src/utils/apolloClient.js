import {AsyncStorage} from 'react-native';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';

const httpLink = new HttpLink({
  uri: 'http://localhost:1337/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('USER_TOKEN');
  // AsyncStorage.getItem('USER_TOKEN').then((token) => {
  //   console.log(token);
  //   if (token && token !== '') {
  //
  //   }
  // });

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
