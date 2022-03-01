import React from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const AnnouncementItem = ({ poster, content, isManager }) => {

    const editPost = () => {
        console.log("editing post");
    };

    const deletePost = () => {
        console.log("deleting post");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.poster}>Poster: {poster}</Text>
                <Text style={styles.content}>Content: {content}</Text>
            </View>
            {isManager
                ?
                <View style={styles.editDelete}>
                    <Pressable onPress={editPost}>
                        <MaterialIcons style={{ marginHorizontal: 3}} name="edit" size={24} color="black" />
                    </Pressable>

                    <Pressable onPress={deletePost}>
                        <MaterialIcons style={{ marginHorizontal: 3}} name="delete" size={24} color="black" />
                    </Pressable>
                </View>
                :
                null
            }       
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },
    textContainer: {
        flex: 5
    },
    poster: {
        fontSize: 15,
        fontWeight: "bold"
    },
    content: {
        fontSize: 10,
    },
    editDelete: {
        flex: 1,
        flexDirection: 'row',

    }
});

export default AnnouncementItem;