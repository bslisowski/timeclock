import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';

const lambdaError = "Custom auth lambda trigger is not configured for the user pool.";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [changePassword, setChangePassword] = useState(false);

    const onPressLogin = async () => {

        try {
            setUser(await Auth.signIn(username, password));
            setError(null);
            setUsername("");
            setPassword("");
            console.log(user);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED'){
                setChangePassword(true);
            } else {
                setLoggedIn(true);
                navigation.navigate("Main");
            }
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };

    const onPressLogout = async () => {
        try {
            await Auth.signOut({ global: true });
            setError(null);
            setUsername("");
            setPassword("");
            console.log("signed out");
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    
    const onPressChangePassword = async () => {
        if (username !== password){
            setError("Passwords do not match: 1: ", username, " 2: ", password);
            return;
        }
        try {
            await Auth.completeNewPassword(user, password);
            setChangePassword(false);
            setUsername("");
            setPassword("");
        } catch (err) {
            console.log(err);
        }   
    };

    useEffect(() => {
        loggedIn ? onPressLogout() : null;
        setLoggedIn(false);
    }, []);


    return (
        <SafeAreaView >
            <View style={styles.container}>
                <Text style={styles.headerText}>{
                    changePassword
                    ?
                    "Set Password"
                    :
                    "Sign In"
                }</Text>
                <Text style={styles.text}>{
                    changePassword
                    ?
                    "New Password"
                    :
                    "Username"
                }</Text>
                <TextInput 
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Text style={styles.text}>{
                    changePassword
                    ?
                    "Confirm New Password"
                    :
                    "Password"
                }</Text>
                <TextInput 
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                {
                    error
                    ?
                    <Text style={styles.errorText}>
                        {
                            error === lambdaError
                            ?
                            "Password required"
                            :
                            error
                        }
                    </Text>
                    :
                    null
                }
                {
                    changePassword
                    ?
                    <View>
                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={onPressChangePassword}
                        >
                            <Text style={styles.buttonText}>Set Password</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={onPressLogin}
                        >
                            <Text style={styles.buttonText}>SIGN IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={onPressLogout}
                        >
                            <Text style={styles.buttonText}>SIGN OUT</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 150
    },
    buttons: {
        borderWidth: 1,
        borderRadius: 10,
        width: "25%",
        padding: 10,
        marginVertical: 10,
        alignSelf: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        width: "75%",
        alignSelf: 'center',
        marginVertical: 10
    },
    text: {
        marginLeft: 50,
        fontWeight: 'bold'
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorText: {
        color: 'red',
        alignSelf: 'center'
    },
    headerText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 100
    }
});

export default LoginScreen;