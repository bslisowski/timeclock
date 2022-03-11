import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DayScreen = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <SafeAreaView>
            <Text style={styles.header }>Day Screen</Text>
            <Text style={styles.header2} >{item.date.toLocaleDateString()}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center", 
        marginVertical: 40
    },
    header2: {
        fontSize: 20,
        textAlign: "center", 
        marginVertical: 40
    }
});

export default DayScreen;