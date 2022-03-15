

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ClockinScreen from './screens/ClockinScreen';
import CreateAnnouncementScreen from './screens/CreateAnnouncementScreen';
import DayScreen from './screens/DayScreen';
import ManagementScreen from './screens/mgmt_screens/ManagementScreen';
import ManageUsersScreen from './screens/mgmt_screens/ManageUsersScreen';
import EditAnnouncementsScreen from './screens/mgmt_screens/EditAnnouncementsScreen';
import EditShiftsScreen from './screens/mgmt_screens/EditShiftsScreen';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import 'react-native-gesture-handler';

import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
import useCachedResources from './hooks/useCachedResources';

Amplify.configure(awsconfig)

const Stack = createStackNavigator();

function ManagementNav(){
  const Stack = createStackNavigator();
  
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="MGMTDash" component={ManagementScreen}/>
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen}/>
      <Stack.Screen name="EditAnnouncements" component={EditAnnouncementsScreen}/>
      <Stack.Screen name="EditShifts" component={EditShiftsScreen}/>
      <Stack.Screen name="Create" component={CreateAnnouncementScreen}/>     
    </Stack.Navigator>
  );
};

function LoginNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false.valueOf,
        tabBarActiveTintColor: '#fb7e14',
        tabBarInactiveTintColor: 'black'
      }}
    >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{
              headerShown: false,
              showIcon: true,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="dashboard" size={size} color={color}/>
              )
            }}  
          />
          <Tab.Screen 
            name="Schedule" 
            component={ScheduleNav}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="calendar" size={size} color={color} />
              )
            }} 
          />
          <Tab.Screen 
            name="Clock" 
            component={ClockinScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="clockcircleo" size={size} color={color} />
              )
            }}   
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="account-circle" size={size} color={color} />
              )
            }}   
          />
      </Tab.Navigator>
  );
};

function DashboardNav(){
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Dash" component={LoginNav}/>
      <Stack.Screen name="MGMT" component={ManagementNav}/>     
    </Stack.Navigator>
  );
};

function ScheduleNav(){
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Sched" component={ScheduleScreen}/>
      <Stack.Screen name="Day" component={DayScreen} />     
    </Stack.Navigator>
  );
};

function App() {
  const isLoadingComplete = useCachedResources();

  if(!isLoadingComplete){
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Main" component={DashboardNav}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
