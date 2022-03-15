import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const ProfilePic = ({ uri, height, width, isMe }) => {

    return (
        <View style={[styles.imageContainer, 
                        (height && width) ? { height: height, width: width } : null]
                    }
        >
                <Image style={styles.image} source={require("../assets/grilledcheese.jpg")} />      
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        borderWidth: 5,
        borderRadius: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        width: 150,
        textAlign: "center",
        alignSelf: 'center',
    },
    image: {
        height: "100%",
        width: "100%",
        resizeMode: 'contain',
        borderRadius: 300
    },
});

export default ProfilePic;