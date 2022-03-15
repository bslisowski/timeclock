import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Workers from '../assets/dummy-data/Workers';
import ProfilePic from './ProfilePic';

const myId = 1;

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


const ShiftItem = ({ shift, needsName }) => {
    if (!shift){
        return null;
    }
    
    const name = (Workers.find((element) => element.id === shift.workerId)).name;
    const day = new Date(shift.startTime);
    const startTime = getTime(day);
    day.setTime(shift.endTime);
    const endTime = getTime(day);
    const position = getPosition(shift.position);
    const isMe = myId === shift.workerId;

    return (
        <View style={needsName ? [styles.container, isMe ? { backgroundColor: '#fb7e14' } : styles.container] : null}>
            {
                needsName
                ?
                <ProfilePic height={50} width={50}/>
                :
                null
            }
            <View style={styles.infoContainer}>
                {
                    needsName
                    ?
                    <Text style={styles.name}>{name}</Text>
                    :
                    null
                }
                <Text>{position}    {startTime} - {endTime}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
        flexDirection: 'row',
        alignContent: 'center'
    },
    name: {
        fontWeight: 'bold',
    },
    infoContainer: {
        marginLeft: 5
    }
});

export default ShiftItem;