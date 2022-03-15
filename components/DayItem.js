import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftItem from './ShiftItem';

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

const DayItem = (props) => {
    const { item, onPress } = props;
    
    const dayOfWeek = getDay(item.day);
    const date = item.date.toLocaleDateString();
    const color = (item.date.toLocaleDateString() === (new Date()).toLocaleDateString()) ? '#fb7e14' : 'black';
    
    if (item.shift) {
        return (
            <SafeAreaView>
                <Pressable
                    onPress={() => {
                        onPress(item);
                    }}
                >
                    <View style={[styles.container, { backgroundColor: color }]}>
                        <Text style={styles.date}>{dayOfWeek} {date}</Text>
                        <ShiftItem shift={item.shift}/>
                    </View>
                    
                </Pressable>
            </SafeAreaView>
        );
    } else {
        return (
            <SafeAreaView>
                <Pressable
                    onPress={() => {onPress(item)}}
                >
                    <View style={[styles.container, { borderColor: color }]} >
                        <Text style={styles.date}>{dayOfWeek} {date}</Text>
                        <Text>Day off!! :)</Text>
                    </View>
                </Pressable>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 5,
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
