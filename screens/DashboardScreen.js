import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SectionList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Announcements from '../assets/dummy-data/Announcements';
import AnnouncementItem from '../components/AnnouncementItem';
import { Ionicons } from '@expo/vector-icons';
import Schedules from '../assets/dummy-data/Schedules';
import DayItem from '../components/DayItem';
import Shifts from '../assets/dummy-data/Shifts';
import Calender from '../assets/dummy-data/Calender';

const isManager = true;
const myName = "Nigger";
const myId = 1;
const tempCalender = Calender;
let itemRenderCount = 1;

const Item = ({ item, type }) => {
    //console.log(itemRenderCount++);
    if (type === "Schedule"){
        return (
            <View style={styles.announcementContainer}>
                <DayItem item={item}/>
            </View>
        );
    }
    else {
        return (
            <View style={styles.announcementContainer}>
                <AnnouncementItem poster={item.poster} content={item.content} isManager={isManager} />
            </View>
        );
    }
};

const Item2 = ({ item, title }) => {
    return (
        <View style={styles.item2} >
            <Text style={styles.header2} >{title}</Text>
            {item
                ?
                <View>
                    <Text>{getPosition(item.position)}</Text>
                    <Text>{getTime(new Date(item.startTime))} - {getTime(new Date(item.endTime))}</Text>
                </View>
                :
                <Text>Day off :)</Text>
            }
        </View>
    );
};

function getTime(day){
    let hour = day.getUTCHours() - (day.getTimezoneOffset()/60);
    if (hour > 12){
        hour -= 12;
    }
    let minutes = day.getUTCMinutes();
    if (minutes < 10){
        return hour + ":0" + minutes;
    }
    else {
        return hour + ":" + minutes;
    }  
}

function getPosition(position){
    switch (position){
        case "BP":
            return "Pretzels";
        case "BB":
            return "Baker";
        case "BC":
            return "Bakery Cashier";
        case "BF": 
            return "Bakery Floater";
        case "MC":
            return "Meat Cashier";
        case "MCk": 
            return "Cook";
        case "MB":
            return "Butcher";
        case "MP":
            return "Produce";
        default:
            return "Shit";
    }
}

const DashboardScreen = ({ navigation }) => {


    const DATA = [
        {
            title: "Pinned",
            data: Announcements.filter(announcement => announcement.pinned)
        },
        {
            title: "Unpinned",
            data: Announcements.filter(announcement => !announcement.pinned)
        },
    ];

    const createButton = () => {
        navigation.navigate("Create");
    };

    const today = Shifts.find(shift => shift.date === (new Date()).toLocaleDateString());
    
    const tomorrow = Shifts.find(shift => shift.date === (new Date(Date.now() + 86400000)).toLocaleDateString());
    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Welcome, {myName}!</Text>
            <View style={styles.todayTomorrow}>
                <Item2 item={today} title="Today" />
                <Item2 item={tomorrow} title="Tomorrow" />
            </View>
            <Text style={styles.header2}>Announcements</Text>
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
            <View style={styles.list}>
                <SectionList 
                    sections={DATA}
                    keyExtractor={item => item.id}
                    renderItem={({ item, section: { title } }) => <Item item={item} type={title}/>}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    initialNumToRender={8}
                    removeClippedSubviews={true}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            
        </SafeAreaView>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center", 
        marginVertical: 20
    },
    header2: {
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
        width: '90%',
        height: "100%",
        flex: 1
    }, 
    announcementContainer: {
        alignItems: 'center'
    },
    item2: {
        alignSelf: 'center',
        margin: 5
    },
    todayTomorrow: {
        marginBottom: 20
    }
});

export default DashboardScreen;