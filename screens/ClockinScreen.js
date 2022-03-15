import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect } from 'react/cjs/react.production.min';

const toMeters = 111139;

function isDST(d) {
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) !== d.getTimezoneOffset();    
};

const ClockinScreen = () => {
    const [clockedIn, setClockedIn] = useState(false);
    const [timeInHour, setTimeInHour] = useState(0);
    const [timeInMinute, setTimeInMinute] = useState(0);
    const [timeOutHour, setTimeOutHour] = useState(0);
    const [timeOutMinute, setTimeOutMinute] = useState(0);
    const [statusMessage, setStatusMessage] = useState("Clock In");
    const storeLocation = { latitude: 40.003172, longitude: -75.293601 };

    // 40.00317288735443, -75.29360148887137
    const pressClock = async () => {
        const time = new Date();
        const dst = isDST(time);

        await Location.requestForegroundPermissionsAsync()
            .then( async ({ status }) => {
                if (status != 'granted'){
                    console.log("errrrorrrrr");
                    return;
                }
                await Location.getCurrentPositionAsync({})
                    .then((result) => {
                        let distance = Math.sqrt(
                            (((storeLocation.latitude - result.coords.latitude)*toMeters)**2 + 
                                ((storeLocation.longitude - result.coords.longitude)*toMeters)**2)
                            );
                        
                        if (distance > 100){
                            setStatusMessage("Too Far From Store");
                            return;
                        }
                        if (clockedIn){
                            setTimeOutHour(time.getHours());
                            setTimeOutMinute(time.getMinutes());
                            setStatusMessage("Clock In");
                        } 
                        else {
                            const tempHour = dst ? time.getHours() - 1 : time.getHours();
                            setTimeInHour(tempHour);
                            const tempMinute = time.getMinutes()
                            setTimeInMinute(tempMinute);
                            setStatusMessage("Clocked in at: " + (tempHour%12 + 1) + ":" + tempMinute + " " + (tempHour > 12 ? "PM" : "AM"));
                        }
                        setClockedIn(!clockedIn);
                    }
                );
            });
    };

    /*useEffect(() => {
        if (clockedIn){
            setStatusMessage
        }
    }, [clockedIn]);*/

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
                    <Text style={[styles.textStyle, statusMessage === "Too Far From Store" ? styles.tooFar : null]}>{statusMessage}</Text>
                    :
                    <Text style={[styles.textStyle, statusMessage === "Too Far From Store" ? styles.tooFar : null]}>{statusMessage}</Text>
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
        marginTop: 50,
    },
    tooFar: {
        color: 'red'
    },
    success: {
        color: 'black'
    }
});

export default ClockinScreen;