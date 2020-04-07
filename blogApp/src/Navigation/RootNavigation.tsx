import * as React from 'react';
import { View, Button, Text, Animated, TouchableOpacity, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Login} from '../containers/Authenticatation/Login';
import {Register} from '../containers/Authenticatation/Register';
import {Articles} from '../containers/Articles/Articles';
import {NewArticle} from '../containers/Articles/NewArticle';

const Stack = createStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#40A3DA' },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Đăng nhập',
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Đăng ký',
        }}
      />
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          title: 'Trang chủ',
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="NewArticle"
        component={NewArticle}
        options={{
          title: 'Thêm mới bài viết',
        }}
      />
    </Stack.Navigator>
  );
}
