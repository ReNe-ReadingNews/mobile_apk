/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import { View, Image, Dimensions, Text, Button, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import type { PropsWithChildren } from 'react';

const {height, width} = Dimensions.get('window')
const BackgroundView = () => {
  return (
    <View>
      <Image style={{width: width, height: height, position: 'absolute'}} source={require('./source/assets/images/BgView.png')} />
    </View>
  );
};

const HomeScreen = () => {
  const [topic, setTopic] = useState('popular');

  return (
    <View>
      <StatusBar barStyle="dark-content" translucent backgroundColor="rgba(0,0,0,0)"/>
      <BackgroundView />
      <View style={[styles.content]}>
        <View style={[styles.Navbar, {flexDirection: 'row'}]}>
          <Text style={[styles.textCol]}>Menu</Text>
          <Image source={require('./source/assets/images/Logo.png')} />
         <Text style={[styles.textCol]}>bell</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-around', width: width - 100, height: 35, position: 'relative'}}>
          <Button title="Popular" color="#841584" />
          <Button title="All" color="#841584" />
          <Button title="kategori 1" color="#841584" />
          <Button title="kategori 2" color="#841584" />
          <Button title="kategori 3" color="#841584" />
        </View>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#38B6FF', marginBottom: 20, paddingTop: 50, alignContent: 'center', borderBlockColor: 'black', position: 'absolute'}}>Welcome to Home Screen !</Text>
        </View>
        {/* <PreviewLayout
        label="topic"
        values={['Popular', 'All', 'kategori', 'kategor', 'katego']}
        selectedValue={topic}
        setSelectedValue={setTopic}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#38B6FF', marginBottom: 20, paddingTop: 50, alignContent: 'center', borderBlockColor: 'black', position: 'absolute'}}>Welcome to Home Screen !</Text>
          </View>
        </PreviewLayout> */}
      </View>
    </View>
  );
};

type PreviewLayoutProps = PropsWithChildren<{
  label: string;
  values : string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}>;

const PreviewLayout = ({ label, values, selectedValue, setSelectedValue, children }: PreviewLayoutProps) => (
  <View style={{padding: 10, flex: 1}}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map(value => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[styles.button, selectedValue === value && styles.selected]}>
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container, {[label]: selectedValue}]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  Navbar: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#38B6FF',
  },
  textCol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#38B6FF',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  box: {
    width: 50,
    height: 50,
  },

});

type News = {
  id: string;
  name: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<News[]>([]);

  const getNews = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-12-15&sortBy=publishedAt&language=en&apiKey=4300dc2f17af479a8fcb710f84994f70');
      const json = await response.json();
      setData(json.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Text>
              {item.title}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;