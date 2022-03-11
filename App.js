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
import 'react-native-gesture-handler';

import Amplify from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
import useCachedResources from './hooks/useCachedResources';

Amplify.configure(awsconfig)

const Stack = createStackNavigator();

function LoginNav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
    headerShown: false
  }}>
          <Tab.Screen name="Dashboard" component={DashboardNav}/>
          <Tab.Screen name="Schedule" component={ScheduleNav}/>
          <Tab.Screen name="Clock" component={ClockinScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
      </Tab.Navigator>
  );
};

function DashboardNav(){
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Dash" component={DashboardScreen}/>
      <Stack.Screen name="Create" component={CreateAnnouncementScreen}/>     
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
      <Stack.Screen name="Day" component={DayScreen}/>     
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
          <Stack.Screen name="Main" component={LoginNav}/>
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
