import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {FormTextInput, Button} from '../../components/Authentication';
import {REGISTER} from '../../queries/Authentication';
import {useMutation} from '@apollo/react-hooks';

export const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // @ts-ignore
  const [register, {data,error}] = useMutation(REGISTER);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleNameChange = (text) => {
    setUsername(text);
  };

  const validateData = () => {
    if (email.trim() === '') {
      return false;
    } else if (username.trim() === '') {
      return false;
    } else if (password.trim() === '') {
      return false;
    }

    return true;
  };

  const handleRegisterPress = async () => {
    if (validateData()) {
      register({
        variables: {username: username, email: email, password: password},
      })
        .then((res) => {
          if (res) {
            console.log(res);
            AsyncStorage.setItem('USER_TOKEN', res.data.register.jwt).then(() => {
                alert('register success');
                navigation.navigate('Articles');
              }
            );
          }
        })
        .catch((error) => {
          alert('register error');
          console.log(error);
        });
    } else {
      alert('Bạn cần nhập đầy đủ dữ liệu');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormTextInput
          value={username}
          onChangeText={handleNameChange}
          placeholder="username"
        />
        <FormTextInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder="email"
        />
        <FormTextInput
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="mật khẩu"
          secureTextEntry
        />
        <Button label="Đăng ký" onPress={handleRegisterPress} />
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
