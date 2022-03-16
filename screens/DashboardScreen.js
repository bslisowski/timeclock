import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SectionList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Butt from '../components/Butt';
import Announcements from '../assets/dummy-data/Announcements';
import AnnouncementItem from '../components/AnnouncementItem';
import DayItem from '../components/DayItem';
import Shifts from '../assets/dummy-data/Shifts';
import Calender from '../assets/dummy-data/Calender';
import { Auth } from 'aws-amplify';

const myId = 1;
const tempCalender = Calender;
let itemRenderCount = 1;



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

const DashboardScreen = ({ route, navigation }) => {

    const [name, setName] = useState("");
    const [isManager, setIsManager] = useState(true);

    useEffect(() => {
        const getName = async () => {
            const user = await Auth.currentAuthenticatedUser();
            
            setName(user.attributes.name);
            if (user?.signInUserSession?.accessToken?.payload['cognito:groups']?.includes('MGMT')){
                setIsManager(true);
            }
        };
        getName();
    },[]);

    useEffect(() => navigation.addListener('beforeRemove', (e) => {
        
        const state = navigation.getState();
        e.preventDefault();
        if (!state.history.find(value => value.key.includes("Schedule"))){
            Alert.alert(
                "Sign Out?",
                null,
                [
                    {
                        text: "Sign Out",
                        onPress: async () => {
                            await Auth.signOut({ global: true })
                                .then(() => navigation.dispatch(e.data.action))

                        },
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("cancel pressed"),
                        style: 'cancel'
                    }
                ]
            );
            }
    }), [navigation]);

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
    
    const Item = ({ item, type }) => {
        
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
                    <AnnouncementItem poster={item.poster} content={item.content} isManager={false} />
                </View>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Welcome, {name}!</Text>
            {
                isManager
                ?
                <Butt 
                    title="MGMT Dash" 
                    onPress={() => navigation.navigate("MGMT")}
                />
                :
                null
            }
            <View style={styles.todayTomorrow}>
                <Item2 item={today} title="Today" />
                <Item2 item={tomorrow} title="Tomorrow" />
            </View>
            <Text style={styles.header2}>Announcements</Text>
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
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        width: "25%",
        alignSelf: 'center',
        paddingHorizontal: 200,
        elevation: 3,
        borderRadius:4,
    }
});

export default DashboardScreen;