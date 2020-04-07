import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import {POST_ARTICLE} from '../../queries/Articles/postArticle';
import {useMutation} from '@apollo/react-hooks';
import {Button} from '../../components/Authentication';
import moment from 'moment';

export const NewArticle = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postArticle, {data, error, loading}] = useMutation(POST_ARTICLE);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleContentChange = (text) => {
    setContent(text);
  };

  const handleBack = () => {
    navigation.pop();
  };

  const handlePostArticle = () => {
    const now = moment().format('YYYY-MM-DD');
    postArticle({
      variables: {title: title, content: content, published_at: now},
    })
      .then((res) => {
        Alert.alert(
          'Thông báo',
          'Thêm bài viết thành công',
          [{text: 'OK', onPress: handleBack}]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiêu đề</Text>
      <TextInput
        value={title}
        onChangeText={handleTitleChange}
        style={[styles.textInput, {marginBottom: 20}]}
      />
      <Text style={styles.title}>Nội dung</Text>
      <TextInput
        value={content}
        onChangeText={handleContentChange}
        multiline
        style={[styles.textInput,{marginBottom: 40, height: 300}]}
      />
      <Button label="Đăng bài" onPress={handlePostArticle} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  title: {fontSize: 16, fontWeight: 'bold', marginBottom: 10},
  textInput: {borderWidth: 1, borderRadius: 5, borderColor: '#858E99', padding: 10, height: 40},
});
