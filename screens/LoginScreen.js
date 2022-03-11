/*
        TODO:
                -make logo into component
*/



import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const lambdaError = "Custom auth lambda trigger is not configured for the user pool.";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [changePassword, setChangePassword] = useState(false);
    const [showPass, setShowPass] = useState(true);

    const onPressLogin = async () => {
        try {
            await Auth.signIn(username, password).then(user => {
                setUser(user);
                setError(null);
                setUsername("");
                setPassword("");
                if (user.challengeName && user.challengeName === 'NEW_PASSWORD_REQUIRED'){
                    setChangePassword(true);
                } else {
                    navigation.navigate("Main");
                }
            });  
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

    const onEndEditing = () => {
        if (username && password){
            onPressLogin();
        }
    };

    useEffect(async () => {
        try {
            await Auth.currentAuthenticatedUser().then((user) => navigation.navigate("Main"));
        } catch (error) {
            
        }
    }, []);


    return (
        <SafeAreaView >
            <View style={styles.logoContainer}>
                    <MaterialCommunityIcons name="lambda" size={80} color="#fb7e14" />
                    <AntDesign name="clockcircleo" size={80} color="black" />
            </View>
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
                    style={styles.username}
                    value={username}
                    onChangeText={setUsername}
                    onEndEditing={onEndEditing}
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
                <View style={styles.passwordContainer}>
                    <TextInput 
                        style={styles.password}
                        value={password}
                        onChangeText={setPassword}
                        onEndEditing={onEndEditing}
                        secureTextEntry={showPass}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Pressable onPress={() => setShowPass(!showPass)}>
                        {
                            showPass
                            ?
                            <Ionicons name="eye-off-outline" size={24} color="#c5c9c6" />
                            :
                            <Ionicons name="eye-outline" size={24} color="grey" />
                        }
                    </Pressable>
                </View>
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
        marginTop: 50
    },
    buttons: {
        borderWidth: 1,
        borderRadius: 10,
        width: "25%",
        padding: 10,
        marginVertical: 10,
        alignSelf: 'center',
    },
    username: {
        borderWidth: 1,
        padding: 10,
        width: "75%",
        alignSelf: 'center',
        marginVertical: 10
    },
    password: {
        padding: 10,
        flex: 5
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
        //alignSelf: 'center',
        marginLeft: 50,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: "75%",
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
        paddingHorizontal: 10
    },
    logoContainer: {
        flexDirection: 'row',
        marginTop: 100,
        alignSelf: 'center'
    }
});

export default LoginScreen;