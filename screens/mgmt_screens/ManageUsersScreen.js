import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workers from '../../assets/dummy-data/Workers';
import { Auth } from 'aws-amplify';


/*
    Auth.signUp({
    'username': 'jdoe',
    'password': 'mysecurerandompassword#123',
    'attributes': {
        'email': 'me@domain.com',
        'phone_number': '+12128601234', // E.164 number convention
        'given_name': 'Jane',
        'family_name': 'Doe',
        'nickname': 'Jane'
    }
});
*/

const submitSignUp = async (submission) => {
    let response;
    try{
        response = await Auth.signUp(submission);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    return response;
};

const confirm = async (username, confirmation) => {
    try{
        response = await Auth.confirmSignUp(username, confirmation);
        console.log(response);
    } catch (error) {
        console.log(error)
    }
    return response;
};

const ManageUsersScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [needConfirm, setNeedConfirm] = useState(false);
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("");

    const onSubmit = () => {
        if (!needConfirm){
            const submission = {
                'username': username,
                'password': password,
                'attributes': {
                    'email': email,
                    'name': name,
                    'preferred_username': username
                }
            };
            if (!submitSignUp(submission)){
                console.log("sign up error");
            } else {
                setNeedConfirm(!needConfirm);
            }
        }
        else {
            if (!confirm(username, confirmation)){
                console.log("confirmation error");
            } else {
                setNeedConfirm(!needConfirm);
                setEmail("");
                setName("");
                setUsername("");
                setPassword("");
                setConfirmation("");
            }
        }
    };

    useEffect(async () => {
            await Auth.currentAuthenticatedUser().then((user) => console.log(user.attributes));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Manage Users Screen</Text>
            <View style={styles.workerContainer}>
                <Text>Worker List</Text>
            </View>
            <View style={styles.newUserContainer}>
                <Text style={styles.newUserTitle}>New User</Text>
                {
                    // email, name, preferred_username
                }
                {
                    !needConfirm
                    ?
                    <>
                        <Text style={styles.inputTitle}>e-mail</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <Text style={styles.inputTitle}>name</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            autoCorrect={false}
                        />
                        <Text style={styles.inputTitle}>username</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setUsername}
                            value={username}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                        <Text style={styles.inputTitle}>password</Text>
                        <TextInput
                            style={styles.input} 
                            onChangeText={setPassword}
                            value={password}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                        />
                    </>
                    :
                    <>
                        <Text style={styles.inputTitle}>Confirmation</Text>
                        <TextInput
                            style={styles.input} 
                            onChangeText={setConfirmation}
                            value={confirmation}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </>
                }
                <Button 
                    style={styles.button}
                    title="Submit"
                    onPress={onSubmit}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    workerContainer: {
        flex: 1,
        
    },
    newUserContainer: {
        flex: 2,
        
    },
    newUserTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 50
    },
    input: {
        borderWidth: 1,
        padding: 10,
        width: "75%",
        alignSelf: 'center',
        marginVertical: 10
    },
    button: {
        width: "20%"
    }
});

export default ManageUsersScreen;