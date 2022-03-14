/*
        TODO:
                -switch days
*/


import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, Modal, Pressable, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftItem from '../components/ShiftItem';
import Shifts from '../assets/dummy-data/Shifts';
import { EvilIcons } from '@expo/vector-icons';


const Item = (item) => {

    return <ShiftItem shift={item.item} needsName={true}/>;
        
}

const DayScreen = ({ route, navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [requestType, setRquestType] = useState()

    const { item } = route.params;
    const data = Shifts.filter((shift) => item.date.toLocaleDateString() === shift.date);
    data.sort((a, b) => a.startTime - b.startTime);
    
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
                        <View style={styles.requestView}>
                            <Text>Request off ◯    Request change ◯</Text>
                            <TextInput
                                style={styles.requestInput}
                                placeholder="Details"
                                multiline={true}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <Text style={styles.header} >{ item ? item.date.toLocaleDateString() : "errur"}</Text>
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
        marginVertical: 40,
        
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
});

export default DayScreen;