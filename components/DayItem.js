import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
}

const DayItem = ({ item }) => {
    const dayOfWeek = getDay(item.day);
    const date = item.date.toLocaleDateString();

    if (item.shift) {
        const day = new Date(item.shift.startTime);
        const startTime = getTime(day);
        day.setTime(item.shift.endTime);
        const endTime = getTime(day);
        const position = getPosition(item.shift.position);
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.date}>{dayOfWeek} {date}</Text>
                    <Text>{position}    {startTime} - {endTime}</Text>
                </View>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView>
                <View style={styles.container} >
                    <Text style={styles.date}>{dayOfWeek} {date}</Text>
                    <Text>Day off!! :)</Text>
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5
    },
    interval: {
        flexDirection: 'row',
    }
});

function arePropsEqual(prevProps, nextProps){
    return prevProps.item.script === nextProps.item.script;
};

export default DayItem;
