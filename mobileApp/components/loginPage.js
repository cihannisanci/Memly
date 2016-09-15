import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import { AWS_SERVER } from '../config';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

// var shape = {
//   id: '',
//   name: '',
//   first_name: '',
//   last_name: '',
//   education: '',
//   location: '',
//   birthday: '',
//   cover: '',
//   picture: '',
//   gender: '',
//   link: '',
//   is_verified: ''
// };

// const infoRequest = new GraphRequest(
//   '/me',
//   {
//     accessToken: accessToken,
//     parameters: {
//       fields: {
//         string: 'id,email,name,first_name,last_name'
//       }
//     }
//   },
//   function(err, res) {
//     console.log('Graph err/result is:', err, res);
//   }
// );

export default class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert('login has error: ' + result.error);
              } else if (result.isCancelled) {
                alert('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    //get data from facebook using accesstoken
                    new GraphRequestManager().addRequest(
                      new GraphRequest(
                        '/me',
                        {
                          accessToken: data.accessToken,
                          parameters: {
                            fields: { //list of field that will be needed to populate the user profile in the db
                              string: 'id,email,name,first_name,last_name'
                            }
                          }
                        },
                        function(err, res) {
                          console.log('Graph err/result is:', err, res);
                        }
                      )
                    ).start();
                    Actions.MainPage();
                  }
                );
              }
            }
          }
          onLogoutFinished={() => alert('logout.')}/>
          <Text onPress={ 
            () => {
              fetch(AWS_SERVER + '/api/nearby/?lat=37.774929&lng=-122.419416')
              .then((res)=>(res.json()))
              .then((text)=>(console.log(text)))
              .catch((err)=>(console.log('error:', err)));
            }
          }>whattt</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});