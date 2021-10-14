
import React, { Component } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Auth0 from 'react-native-auth0';

var credentials = require('./auth0-configuration.js');
//const auth0 = new Auth0(credentials);
const auth0 = new Auth0({ domain: 'reserveplus.us.auth0.com', clientId: 'rxi1OPheyP6R9iBKbDFzTBa3iGnoBf6O' });

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { accessToken: null };
    }

    _onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email'
            })
            .then(credentials => {
                Alert.alert('Logueado')
                //Alert.alert('AccessToken: ' + credentials.accessToken);
                this.setState({ accessToken: credentials.accessToken });
            })
            .catch(error => console.log(error));
    };

    _onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                Alert.alert('Deslogueado');
                this.setState({ accessToken: null });
            })
            .catch(error => {
                console.log('Log out cancelled');
            });
    };

    render() {
        let loggedIn = this.state.accessToken === null ? false : true;
        return (
        <View style = { styles.container }>
            <Text style = { styles.header }>Reserve plus</Text>
            <Image style={{ width: 100, height: 100, marginBottom: 15 }} source={require("./img/logo.png")}/>
            <Text>
                Usted{ loggedIn ? ' ' : ' no ' }esta logueado </Text>
                <Button onPress = { loggedIn ? this._onLogout : this._onLogin }
                title = { loggedIn ? 'Log Out' : 'Log In' }/>
        </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

export default App;
