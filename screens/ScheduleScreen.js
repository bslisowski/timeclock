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
        TextInput,
        FlatList,
        Button
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workers from '../assets/dummy-data/Workers';
import Shifts from '../assets/dummy-data/Shifts';
import Schedules from '../assets/dummy-data/Schedules';
import DayItem from '../components/DayItem';
import Calender from '../assets/dummy-data/Calender';
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const myId = 1;
const dayToMs = 86400000;
const weekToMs = dayToMs*7;

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

function changeDATA(id){
    let schedule;
    if (id === 0){
        const date = (new Date()).getTime();
        schedule = Schedules.find((s) => s.startDate < date && s.endDate > date);
    } else {
        schedule = Schedules.find((s) => s.id === id);
    }
    const tempData = Calender.filter(value => 
        value.date.getTime() >= schedule.startDate && value.date.getTime() <= schedule.endDate
    );

    const myShifts = Shifts.filter(value => value.scheduleId === schedule.id && value.workerId === myId);
    
    tempData.forEach((day) => {
        day.shift = myShifts.find(s => day.date.toLocaleDateString() === s.date);
    });
    return tempData;
};

const ScheduleScreen = ({ navigation }) => {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [DATA, setDATA] = useState({ data: [], currId: -1});
    
    useEffect(() => {
        const date = (new Date()).getTime();
        const tempId = (Schedules.find((s) => s.startDate < date && s.endDate > date)).id;
        setDATA({ data: changeDATA(tempId), currId: tempId});
    }, []);
    
    
    const Item = ({ item }) => {
        return (
            <DayItem item={item} onPress={dayItemOnPress}/>
        );
    };

    const dayItemOnPress = (date) => {
        navigation.navigate("Day", { item: date });
    };

    const onPress = (id) => {
        if (id === 0 || id >= Schedules.length){
            return;
        }
        setDATA({ data: changeDATA(id), currId: id}) 
    };

    return (
        <SafeAreaView style={styles.container}>         
            <Text style={styles.header}>Schedule</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    style={styles.button}
                    title="Prev."
                    onPress={() => onPress(DATA.currId - 1)}
                />
                <Button 
                    style={styles.button}
                    title="Next"
                    onPress={() => onPress(DATA.currId + 1)}
                />
            </View>
            <View style={styles.list}>
                <FlatList
                    data={DATA.data}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        flex: 1
    },
    list: {
        alignSelf: 'center',
        width: '75%',
        height: '90%',
        flex: 15
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    button: {

    }
});

export default ScheduleScreen;