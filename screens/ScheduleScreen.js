import React, { useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, SectionList, PixelRatio } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workers from '../assets/dummy-data/Workers';
import Shifts from '../assets/dummy-data/Shifts';
import Schedules from '../assets/dummy-data/Schedules';
import DayItem from '../components/DayItem';
import Calender from '../assets/dummy-data/Calender';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';

const myId = 1;
let DATA = Calender;


const Item = ({ item }) => {
    return (
        <DayItem item={item}/>
    );
};

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


const ScheduleScreen = () => {
    const today = new Date();
    const scrollTo = getMonthIndex(today.getMonth()) + today.getDate();

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
            <Text style={styles.header}>Schedule</Text>
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
    }
});

export default ScheduleScreen;