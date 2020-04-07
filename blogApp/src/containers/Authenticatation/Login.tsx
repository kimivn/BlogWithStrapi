import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import {FormTextInput, Button} from '../../components/Authentication';
import {LOGIN} from '../../queries/Authentication';
import {useMutation} from '@apollo/react-hooks';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // @ts-ignore
  const [login, {data, error, loading}] = useMutation(LOGIN);
  // const [register, {responseRegister}] = useMutation(REGISTER);
  // useEffect(() => {});

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const validateData = () => {
    if (email.trim() === '') {
      return false;
    } else if (password.trim() === '') {
      return false;
    }

    return true;
  };

  const handleLoginPress = async () => {
    if (validateData()) {
      login({variables: {identifier: email, password: password}})
        .then((res) => {
          if (res) {
            console.log(res);
            AsyncStorage.setItem('USER_TOKEN', res.data.login.jwt).then(() => {
              alert('login success');
              navigation.navigate('Articles');
            });
          }
        })
        .catch((error) => {
          alert('login error');
          console.log(error);
        });
    } else {
      alert('Bạn cần nhập đầy đủ dữ liệu');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  AsyncStorage.getItem('USER_TOKEN').then((token) => {
    console.log(token);
    if (token && token !== '') {
      navigation.navigate('Articles');
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormTextInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder="username hoặc email"
        />
        <FormTextInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="mật khẩu"
          secureTextEntry
        />
        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginBottom: 15}}
        >
          <Text>Quên mật khẩu?</Text>
        </TouchableOpacity>
        <Button label="Đăng nhập" onPress={handleLoginPress} />
        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: 10}}
          onPress={handleRegister}
        >
          <Text style={{fontSize: 16, color: '#40A3DA', fontWeight: 'bold'}}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});
