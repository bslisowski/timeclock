import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const ManagementScreen = ({ navigation }) => {

    const onPress = (type) => {
        switch(type){
            case "user":
                return navigation.navigate("ManageUsers");
            case "schedule":
                return navigation.navigate("EditShifts");
            case "announcement":
                return navigation.navigate("EditAnnouncements");
            default:
                return console.log("error");
        }
    };
    
    return (
        <SafeAreaView >
            <Text>Management Screen</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.buttons}
                    onPress={() => onPress("user")}
                    title="Manage Users"
                />
                <Button 
                    style={styles.buttons}
                    onPress={() => onPress("schedule")}
                    title="Edit Schedule"
                />
                <Button 
                    style={styles.buttons}
                    onPress={() => onPress("announcement")}
                    title="Edit Announcements"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});

export default ManagementScreen;