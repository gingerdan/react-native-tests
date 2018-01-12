import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

onButtonPress() {
  const { email, password } = this.state;

  this.setState({ error: '', loading: true });

// Auth fail check
  firebase.auth().signInWithEmailAndPassword(email, password)
  //if success call login success
    .then(this.onLoginSuccess.bind(this))
    //if valid email but bad password
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        //correct email wrong password
        .catch(this.onLoginFail.bind(this));
        });
}

onLoginFail() {
  this.setState({ error: 'Authentication Failed', loading: false });
}

onLoginSuccess() {
  this.setState({
   email: '',
   password: '',
   loading: false,
   error: ''
  });
}

renderButton() {
  if (this.state.loading) {
    return <Spinner size="small" />;
  }

  return (
    <Button onPress={this.onButtonPress.bind(this)}>
      Log in
    </Button>

  );
}

  render() {
    return (
       <Card>
        <CardSection>
          <Input
              placeholder="user@gmail.com"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
            <Input
              secureTextEntry
              placeholder="enter password"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
       </Card>

    );
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
