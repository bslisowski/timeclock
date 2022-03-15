import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { StackActions } from '@react-navigation/native';
import ProfilePic from '../components/ProfilePic';
import Workers from '../assets/dummy-data/Workers';


const ProfileScreen = ({ navigation }) => {
    const [imageUri, setImageUri] = useState("");
    const [name, setName] = useState("");
    
    const onPressLogout = () => navigation.dispatch(StackActions.popToTop());

    useEffect( async () => {
        try{
            await Auth.currentAuthenticatedUser().then(value => {
                setName(value.attributes.name); 
                const uri =  Workers.find(work => {
                    if (work){
                        if (work.name === name) {
                            setImageUri(work.picUri);
                            return work;
                        }
                        else return null;
                    }
                    else {
                        console.log("work error");
                        return null;
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ProfilePic uri={imageUri}/>
                <Text style={styles.name}>{name}</Text>
                <Button 
                    onPress={onPressLogout}
                    title="Log Out"
                    style={styles.logoutButton}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    logoutButton: {
        borderWidth: 1,
        borderRadius: 10,
        width: "25%",
        padding: 25, 
    },
    name: {
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center'
    }
});

export default ProfileScreen;