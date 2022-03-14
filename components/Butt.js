import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


const Butt = ({ title, onPress }) => {

    return (
        <View style={styles.container}> 
            <Pressable
                style={styles.button}
                onPress={onPress} 
            >
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        backgroundColor: '#fb7e14',
        justifyContent: 'center',
        width: '25%',
        alignSelf: 'center',
        height: 50,
        borderRadius: 10,
        opacity: 10
    },
    button: {
        alignSelf: 'center'
    },
    title: {
        textAlign: 'center'
    }
});

export default Butt;
