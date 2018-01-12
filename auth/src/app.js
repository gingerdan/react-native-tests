import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
state = { loggedIn: null };
// connect to firebase
  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyBNm3eiYM2B8wbF-LHy3C2m5eeWBgqjtAM',
    authDomain: 'auth-581cd.firebaseapp.com',
    databaseURL: 'https://auth-581cd.firebaseio.com',
    projectId: 'auth-581cd',
    storageBucket: 'auth-581cd.appspot.com',
    messagingSenderId: '698339044411'
    });
//Check wether user is logged in or not
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
  });
}


//helper
renderContent() {
  switch (this.state.loggedIn) {
    case true:
      return (
        <Button onPress={() => firebase.auth().signOut()}>
        Log Out
        </Button>
      );
    case false:
      return <LoginForm />;
    default:
      return <Spinner size="large" />;
  }
}

render() {
  return (
    <View>
      <Header headerText="Authentication" />
      {this.renderContent()}
      </View>
    );
  }
}

export default App;
