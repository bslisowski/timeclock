import React, { useState } from 'react';
import { Button, Text, View, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';

const CreateAnnouncementScreen = () => {
    const [subjbect, setSubject] = useState(null);
    const [body, setBody] = useState(null);
    const [pinned, setPinned] = useState(false);

    const submit = () => {
        console.log("submitting");
    };


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Announcement</Text>
                <View style={styles.checkBoxContainer}>
                    <Checkbox 
                        style={styles.checkBox}
                        value={pinned}
                        onValueChanged={setPinned}
                    />
                    <Text style={{ padding: 5}}>Pin Post</Text>
                </View>
                <TextInput 
                    style={styles.subject}
                    placeholder="Subject"
                    onChangeText={setSubject}
                />
                <TextInput 
                    style={styles.body}
                    placeholder="Body"
                    onChangeText={setBody}
                />
                <Button 
                    style={styles.submit}
                    title="Submit"
                    onPress={submit}
                />
            </View>
        </SafeAreaView>
    ); 
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 75,
        backgroundColor: 'red'
    },
    subject: {
        borderWidth: 2,
        width: '80%',
    },
    body: {
        borderWidth: 2,
        marginVertical: 20,
        width: '80%',
        height: '50%'
    }, 
    submit: {

    },
    checkBoxContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center'
    },
    checkBox: {
       
    }
});

export default CreateAnnouncementScreen;