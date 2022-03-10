import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';

const toMeters = 111139;

const ClockinScreen = () => {
    const [clockedIn, setClockedIn] = useState(false);
    const [timeInHour, setTimeInHour] = useState(0);
    const [timeInMinute, setTimeInMinute] = useState(0);
    const [timeOutHour, setTimeOutHour] = useState(0);
    const [timeOutMinute, setTimeOutMinute] = useState(0);
    const [statusMessage, setStatusMessage] = useState("Clock In");
    const storeLocation = { latitude: 40.007508, longitude: -75.285957 };


    const pressClock = async () => {
        const time = new Date();
        
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
                            setTimeInHour(time.getHours());
                            setTimeInMinute(time.getMinutes());
                            setStatusMessage("Clocked in at: ", timeInHour%12 + 1, ":", timeInMinute, " ", (timeInHour > 12 ? "PM" : "AM"));
                        }
                        setClockedIn(!clockedIn);
                    }
                );
            });

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