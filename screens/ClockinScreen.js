import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const ClockinScreen = () => {
    const [clockedIn, setClockedIn] = useState(false);
    const [timeInHour, setTimeInHour] = useState(0);
    const [timeInMinute, setTimeInMinute] = useState(0);
    const [timeOutHour, setTimeOutHour] = useState(0);
    const [timeOutMinute, setTimeOutMinute] = useState(0)
    
    const pressClock = () => {
        const time = new Date();
        
        if (clockedIn){
            setTimeOutHour(time.getHours());
            setTimeOutMinute(time.getMinutes());
        } 
        else {
            setTimeInHour(time.getHours());
            setTimeInMinute(time.getMinutes());
        }
        setClockedIn(!clockedIn);
        console.log(timeInHour);
        console.log(timeInMinute);

    };

    
    return (
        <SafeAreaView >
            <View style={styles.btnContainer}>
                <Pressable onPress={pressClock}>
                    {
                        clockedIn
                        ?
                        <AntDesign name="clockcircleo" size={200} color="green" />
                        :
                        <AntDesign name="clockcircleo" size={200} color="black" />
                    }
                </Pressable>
            </View>
            <View style={styles.txtContainter}>
                {
                    clockedIn
                    ?
                    <Text style={styles.textStyle}>Clocked in at: {timeInHour%12 + 1}:{timeInMinute} {timeInHour > 12 ? "PM" : "AM"}</Text>
                    :
                    <Text style={styles.textStyle}>Clock In</Text>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        alignSelf: 'center',
        marginTop: 250,
    },
    txtContainter: {
        alignSelf: 'center',
    },
    textStyle: {
        fontSize: 25,
        marginTop: 50
    }
});

export default ClockinScreen;