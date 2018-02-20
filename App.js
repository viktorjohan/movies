import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Image, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import Button from 'react-native-button';

class FirstScreen extends React.Component {
  static navigationOptions = {
    title: 'Trending movies'
  }

constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentWillMount = () => {
    fetch('http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ee6d41a5bdde5b2c02e70a497b550f64')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          data: response.results
        });
      })
  }

  render() {
    var {navigate} = this.props.navigation;
    return (
      <ScrollView style={{backgroundColor: '#19222F'}}>
        <StatusBar
         backgroundColor="blue"
         barStyle="light-content"
       />
        <View style={{flex: 1, alignItems: 'center', marginTop: 12, marginBottom: 12}}>
          <Animatable.Image animation="zoomInUp" source={{uri: 'https://image.flaticon.com/icons/png/512/168/168858.png'}} style={{width: 120, height: 120, marginTop: 10}}></Animatable.Image>
        </View>
        {this.state.data.map(function(item, i){
          return (
            <View style={{flex: 1, alignItems: 'center', backgroundColor: '#262F3C', marginLeft: 30, marginRight: 30, marginTop: 9, marginBottom: 9, borderRadius: 50}} key={i}>
              <Button
                containerStyle={{marginTop: 6, marginBottom: 6, paddingLeft: 9, paddingRight: 9}}
                style={{textAlign: 'center', fontSize: 18, fontFamily: 'AvenirNext-Heavy', color: '#EBEEF2'}}
                key={i}
                onPress={() => navigate('Second', { over: item.overview, date: item.release_date, title: item.original_title, poster: item.poster_path, score: item.vote_average })}>
                {item.original_title}
              </Button>
            </View>
          )
        })}
      </ScrollView>
    );
  }
}

class SecondScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });
  render() {
    var {params} = this.props.navigation.state;
    return (
      <View style={{flex: 1, alignItems: 'center', padding: 28, backgroundColor: '#17202B'}}>
        <Animatable.Image animation="fadeInUp" source={{uri: 'https://image.tmdb.org/t/p/w500' + params.poster}} style={{width: "59%", height: 300, marginBottom: 20}}/>
        <Animatable.Text animation="fadeIn" style={{marginBottom: 18, fontFamily: 'Avenir', fontSize: 14, color: '#EBEEF2'}}>{params.over}</Animatable.Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image source={{uri: 'http://diylogodesigns.com/blog/wp-content/uploads/2016/02/IMDb-Movies-TV-logo-design-for-apps.png'}} style={{width: 36, height: 36}} />
          <Text style={{fontFamily: 'AvenirNext-BoldItalic', fontSize: 15, marginTop: 7, color: '#EBEEF2'}}>{params.score}</Text>
        </View>
      </View>
    );
  }
}

const Navigation = StackNavigator({
  First: {screen: FirstScreen},
  Second: {screen: SecondScreen}
});

export default Navigation;
