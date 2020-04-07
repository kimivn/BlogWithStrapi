/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ApolloProvider} from 'react-apollo';
import client from './src/utils/apolloClient';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/Navigation/RootNavigation';

const App: () => React$Node = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

export default App;
