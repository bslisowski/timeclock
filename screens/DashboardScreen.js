import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SectionList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Announcements from '../assets/dummy-data/Announcements';
import AnnouncementItem from '../components/AnnouncementItem';
import { Ionicons } from '@expo/vector-icons';

const isManager = true;
const myName = "Brendan";

const Item = ({ post }) => {
    return (
        <View style={styles.announcementContainer}>
            <AnnouncementItem poster={post.poster} content={post.content} isManager={isManager} />
        </View>
    );
};

const DashboardScreen = ({ navigation }) => {

    const DATA = [
        {
            title: "Pinned",
            data: Announcements.filter(announcement => announcement.pinned)
        },
        {
            title: "Other",
            data: Announcements.filter(announcement => !announcement.pinned)
        }
    ];

    const createButton = () => {
        navigation.navigate("Create");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.header}>Welcome, {myName}!</Text>
                <Text style={styles.announcementHeader}>Announcements</Text>
                {
                    isManager
                    ?
                    <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                        <Text style={{ padding: 5 }}>New Post</Text>
                        <Pressable onPress={createButton}>
                            <Ionicons name="create" size={24} color="black" />
                        </Pressable>
                    </View>
                    :
                    null
                }
            </View>
            <View style={styles.list}>
                <SectionList 
                    sections={DATA}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Item post={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                />
            </View>
            
        </SafeAreaView>
    ); 
};

const styles = StyleSheet.create({
    container: {
        
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center", 
        marginVertical: 20
    },
    announcementHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }, 
    sectionHeader: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 15,
    },
    list: {
        alignSelf: 'center',
        width: '90%'
    }, 
    announcementContainer: {
        alignItems: 'center'
    }
});

export default DashboardScreen;