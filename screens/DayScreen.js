import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Modal, Pressable, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftItem from '../components/ShiftItem';
import Shifts from '../assets/dummy-data/Shifts';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const dayToMs = 86400000;
const Item = (item) => {
    return <ShiftItem shift={item.item} needsName={true}/>;
}

const DayScreen = ({ route, navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [requestType, setRequestType] = useState("");
    const [off, setOff] = useState(false);
    const [change, setChange] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [data, setData] = useState([]);

    
    const onPressCircles = (type) => {
        if (type === "off"){
            setOff(!off);
            if (!off){
                setChange(false);
            }
        }
        else if (type === "change"){
            setChange(!change);
            if (!change){
                setOff(false);
            }
        }
        else {
            console.log("error");
        }
        setSubmitError("");
    };

    const onPressX = () => {
        setShowModal(false);
        setOff(false);
        setChange(false);
        setSubmitError("");
    };

    const onPressSubmit = () => {
        if (!off && !change){
            setSubmitError("Request Type Required");
            return;
        }
        setSubmitError("");
    };

    const onPressArrow = (sign) => {
        setDate(new Date(date.getTime() + sign * dayToMs));
    };

    useEffect(() => {
        setDate(route.params.item.date);
    }, []);

    useEffect(() => {
        if (!date){
            return;
        }
        setData((Shifts.filter((shift) => date.toLocaleDateString() === shift.date))
                    .sort((a, b) => a.startTime - b.startTime));
    }, [date]);

    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                visible={showModal}
                transparent={true}
                onRequestClose={() => {setShowModal(!showModal)}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>Make Request</Text>
                            <Pressable onPress={onPressX}>
                                <EvilIcons
                                    name="close"
                                    size={24}
                                    color="black"
                                    style={styles.exitIcon}
                                />
                            </Pressable>  
                        </View>
                        <View style={styles.requestView}>
                            <View style={styles.requestType}>   
                                <Text>Request Off</Text>
                                <Pressable onPress={() => {onPressCircles("off")}} hitSlop={5}>
                                {
                                    off
                                    ?
                                    <FontAwesome 
                                        name="circle" 
                                        size={15} 
                                        color="black"  
                                        style={styles.requestCircles}
                                    />
                                    :
                                    <FontAwesome 
                                        name="circle-o" 
                                        size={15} 
                                        color="black" 
                                        style={styles.requestCircles}
                                    />
                                }
                                </Pressable>
                                <Text>Request Change</Text>
                                <Pressable onPress={() => {onPressCircles("change")}} hitSlop={5}>
                                {
                                    change
                                    ?
                                    <FontAwesome 
                                        name="circle" 
                                        size={15} 
                                        color="black"  
                                        style={styles.requestCircles}
                                    />
                                    :
                                    <FontAwesome 
                                        name="circle-o" 
                                        size={15} 
                                        color="black" 
                                        style={styles.requestCircles}
                                    />
                                }
                                </Pressable>
                            </View>
                            {
                                submitError
                                ?
                                <Text style={styles.error}>{submitError}</Text>
                                :
                                null
                            }
                            <TextInput
                                style={styles.requestInput}
                                placeholder="Details"
                                multiline={true}
                                onChangeText={setDescription}
                            />
                            <Button 
                                title="Submit Request"
                                onPress={onPressSubmit}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => onPressArrow(-1)}>
                    <EvilIcons name="arrow-left" size={50} color="black" />
                </Pressable>
                <Text style={styles.header} >{date ? date.toLocaleDateString() : null}</Text>
                <Pressable onPress={() => onPressArrow(1)}>
                    <EvilIcons name="arrow-right" size={50} color="black" />
                </Pressable>
            </View>
            <Button 
                title='Make Request'
                onPress={() => setShowModal(!showModal)}
            />
            {
                data.length != 0
                ?
                <View style={styles.list}>
                    <FlatList 
                        data={data}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
                :
                <Text>No Shifts Scheduled</Text>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 30
    },
    header2: {
        fontSize: 20,
        textAlign: "center", 
        marginVertical: 40,   
    },
    list: {
        alignSelf: 'center',
        width: '75%',
        height: '90%',
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
      modalTitleContainer: {
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
        alignSelf: 'flex-end',
        flex: 1
      },
      requestType: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      requestCircles: {
        marginHorizontal: 5
      },
      error: {
        textAlign: 'center',
        color: 'red'
      },
      modalTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 20,
        flex: 1,
        textAlign: 'center'
      },
      headerContainer: {
        flexDirection: 'row',
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center'
      }
});

export default DayScreen;