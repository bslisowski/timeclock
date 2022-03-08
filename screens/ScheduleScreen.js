import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, StyleSheet, View, FlatList, SectionList, PixelRatio, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workers from '../assets/dummy-data/Workers';
import Shifts from '../assets/dummy-data/Shifts';
import Schedules from '../assets/dummy-data/Schedules';
import DayItem from '../components/DayItem';
import Calender from '../assets/dummy-data/Calender';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { TextInput } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';

const myId = 1;
let DATA = Calender;

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
    const [showModal, setShowModal] = useState(false);
    const [modalItem, setModalItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const today = new Date();
    const scrollTo = getMonthIndex(today.getMonth()) + today.getDate();

    const Item = ({ item }) => {
        return (
            <Pressable onPress={() => {
                setShowModal(!showModal);
                setModalItem(item);
                }
            }>
                <DayItem item={item}/>
            </Pressable>
        );
    };
    
    useEffect(() => {
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
        
    }, []); 


    return (
        <SafeAreaView>
            <Modal 
                animationType="slide"
                visible={showModal}
                transparent={true}
                onRequestClose={() => {
                    console.log("onRequestClose");
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable onPress={() => setShowModal(false)}>
                            <EvilIcons 
                                name="close" 
                                size={24} 
                                color="black" 
                                style={styles.exitIcon}
                            />
                        </Pressable>
                        {
                            modalItem
                            ?
                            <View>
                                <View style={styles.modalTitle}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{getDay(modalItem.day)} </Text>
                                    <Text>{modalItem.date.toLocaleDateString()}</Text>
                                </View>
                                <View>
                                    {modalItem.shift
                                        ?
                                        <Text>{getPosition(modalItem.shift.position)} {getTime((new Date(modalItem.shift.startTime)))} - {getTime((new Date(modalItem.shift.endTime)))}</Text>
                                        : 
                                        <Text>Day off :)</Text>
                                    }
                                </View>
                                <View style={styles.requestView}>
                                    <Text>Request off ◯    Request change ◯</Text>
                                    <TextInput 
                                        style={styles.requestInput}
                                        placeholder="Details"
                                        multiline={true}
                                    />
                                </View>
                            </View>
                            : 
                            null
                        }
                    </View>
                </View>
            </Modal>    
            <Text style={styles.header}>Schedule</Text>
            <TextInput 
                style={styles.search}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Find Date: YYYY-MM-DD"
            />
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
                        getItemHeight: (rowData, sectionIndex, rowIndex) => 43,
                   
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
      search: {
        borderWidth: 1,
        height: 30,
        padding: 5,
        marginHorizontal: 20
      }
});

export default ScheduleScreen;