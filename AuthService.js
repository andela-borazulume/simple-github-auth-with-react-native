import buffer from 'buffer';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
const authKey = 'auth';
const userKey = 'user';

class AuthService {
  login(cred, cb) {
    let b = new buffer.Buffer(cred.username + ':' + cred.password);
    let encodedAuth = b.toString('base64');
    fetch('https://api.github.com/user', {
      headers: {
        'Authorization': 'Basic ' + encodedAuth
      }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)]
        ], (err) => {
          if (err) {
            throw err;
          }
          return cb({ success: true });
        })
      })
      .catch((err) => {
        return cb(err);
        this.setState(err);
      })
      .finally(() => {
        this.setState({ showlLoading: false });
      });

  }
  getAuthInfo(cb) {
    AsyncStorage.multiGet([authKey, userKey],(err, val) => {
      if(err) {
        return cb(err);
      }
      if(!val) {
        console.log('no value')
        return cb();
      }
      let zippedObj = _.zipObject(val);
      if(!zippedObj[authKey]) {
        return cb();
      }
      let authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[authKey])
      }
      console.log(zippedObj[authKey], 'there is value')
      return cb(null, authInfo);
    });
  }
}
module.exports = new AuthService();

// export default new AuthService();