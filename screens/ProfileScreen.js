import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { StackActions } from '@react-navigation/native';


const ProfileScreen = ({ navigation }) => {
    const [imageUri, setImageUri] = useState("../assets/grilledcheese.jpg");
    const [name, setName] = useState("");

    const onPressLogout = () => navigation.dispatch(StackActions.popToTop());

    useEffect(() => {
        const getName = async () => {
            await Auth.currentAuthenticatedUser().then(user => {
                setName(user.attributes.name);   
            });
        };
        getName();
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/grilledcheese.jpg')} />
            </View>
            <Text style={styles.name}>{name}</Text>
            <Button 
                onPress={onPressLogout}
                title="Log Out"
                style={styles.logoutButton}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        borderWidth: 1,
        borderRadius: 10,
        width: "25%",
        padding: 25, 
    },
    imageContainer: {
        borderWidth: 5,
        borderColor: '#fb7e14',
        borderRadius: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        width: 150,
        textAlign: "center",
        alignSelf: 'center'
    },
    image: {
        height: "100%",
        width: "100%",
        resizeMode: 'contain',
        borderRadius: 300
    },
    name: {
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center'
    }
});

export default ProfileScreen;