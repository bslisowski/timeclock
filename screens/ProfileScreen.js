import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { StackActions } from '@react-navigation/native';


const ProfileScreen = ({ navigation }) => {
    const onPressLogout = () => navigation.dispatch(StackActions.popToTop());

    return (
        <SafeAreaView>
            <Text>Profile Screen</Text>
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
        padding: 25
    }
});

export default ProfileScreen;