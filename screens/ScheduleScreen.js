/*
        TODO:
                -schedule screen lists current week
                    -buttons to go back/forward a week
                -enable search
                -navigate to day screen
*/

import React, { useState, useEffect } from 'react';
import { Text, 
        StyleSheet, 
        View, 
        SectionList, 
        PixelRatio, 
        Pressable, 
        Modal, 
        TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workers from '../assets/dummy-data/Workers';
import Shifts from '../assets/dummy-data/Shifts';
import Schedules from '../assets/dummy-data/Schedules';
import DayItem from '../components/DayItem';
import Calender from '../assets/dummy-data/Calender';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const myId = 1;

function getMonthIndex(month){
    switch(month){
        case 0:
            return 1;
        case 1:
            return 33;
        case 2:
            return 61;
        case 3:
            return 93;
        case 4:
            return 124;
        case 5:
            return 156;
        case 6:
            return 187;
        case 7:
            return 219;
        case 8:
            return 252;
        case 9:
            return 283;
        case 10:
            return 215;
        case 11:
            return 346;
        default:
            return 0;
    }
};

function getDay(day){
    switch(day){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Error";
    }
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

const ScheduleScreen = ({ navigation }) => {
    //const [showModal, setShowModal] = useState(false);
    //const [dayItem, setDayItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [DATA, setDATA] = useState(Calender);

    const today = new Date();
    const scrollTo = getMonthIndex(today.getMonth()) + today.getDate();

    const mySchedule = Shifts.filter(value => value.workerId === myId);
        
    DATA.forEach(month => {
        month.data.forEach(day => {
            mySchedule.forEach(s => {
                if (day.date.toLocaleDateString() === s.date){
                    day.shift = s;
                }
            } )
        })
    });
        
    const Item = ({ item }) => {
        //setDayItem(item);
        return (
            <DayItem item={item} onPress={dayItemOnPress}/>
        );
    };

    const dayItemOnPress = (item) => {
        console.log("hi");
        navigation.navigate("Day", { item });
    };

    return (
        <SafeAreaView>         
            <Text style={styles.header}>Schedule</Text>
            <View style={styles.searchContainer}>
                <Octicons name="search" size={20} color="black" />
                <TextInput 
                    style={styles.searchInput}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder="Find Date: YYYY-MM-DD"
                />
            </View>
            <View style={styles.list}>
                <SectionList 
                    sections={DATA}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Item item={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    initialNumToRender={9}
                    getItemLayout={sectionListGetItemLayout({
                        // The height of the row with rowData at the given sectionIndex and rowIndex
                        getItemHeight: (rowData, sectionIndex, rowIndex) => 67,
                   
                        // These four properties are optional
                        getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
                        getSectionHeaderHeight: () => 57, // The height of your section headers
                        getSectionFooterHeight: () => 0, // The height of your section footers
                        
                    })}
                    initialScrollIndex={scrollTo}
                    removeClippedSubviews={true}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    list: {
        alignSelf: 'center',
        width: '75%'
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 50,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalTitle: {
          flexDirection: 'row',
          alignItems: 'center',
      },
      requestView: {
          margin: 15
      },
      requestInput: {
          marginTop: 10,
        borderWidth: 1,
        height: 30,
        padding: 5
      },
      exitIcon: {
          marginLeft: 210,
          
      },
      searchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        height: 30,
        padding: 5,
        marginHorizontal: 20
      },
      searchInput: {
          height: 30,
          alignSelf: 'center',
          paddingLeft: 5
      }
});

export default ScheduleScreen;