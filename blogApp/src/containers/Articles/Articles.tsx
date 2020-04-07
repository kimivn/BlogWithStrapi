import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList,AsyncStorage} from 'react-native';
import {GET_ARTICLES} from '../../queries/Articles/articles';
import {useQuery} from '@apollo/react-hooks';

export const Articles = ({navigation}) => {
  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.log(error);
    return <Text>Error!!!</Text>;
  }

  const articleItem = ({item}) => (
    <View style={{paddingHorizontal: 15}}>
      <Text
        style={{fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize', marginVertical: 10}}
      >
        {item.title}
      </Text>
      <Text style={{fontSize: 13, fontStyle: 'italic'}}>
        {item.published_at}
      </Text>
      <Text style={{marginBottom: 15, marginTop: 5}} numberOfLines={4}>
        {item.content}
      </Text>
    </View>
  );

  const logout = () => {
    AsyncStorage.removeItem('USER_TOKEN');
    navigation.pop();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{padding: 15}}
          onPress={() => {navigation.navigate('NewArticle')}}
        >
          <Text style={{fontSize: 16, color: '#D0021B'}}>Thêm bài viết</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 15}}
          onPress={logout}
        >
          <Text style={{fontSize: 16, color: '#D0021B'}}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={data.articles} renderItem={articleItem} keyExtractor={(item) => item.id}/>
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
