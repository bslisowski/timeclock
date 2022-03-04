import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import ClockinScreen from './screens/ClockinScreen';
import CreateAnnouncementScreen from './screens/CreateAnnouncementScreen';

import Amplify from 'aws-amplify'
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(awsconfig)

const Tab = createBottomTabNavigator();

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
}
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
    headerShown: false
  }}>
          <Tab.Screen name="Dashboard" component={DashboardNav}/>
          <Tab.Screen name="Schedule" component={ScheduleScreen}/>
          <Tab.Screen name="Clock" component={ClockinScreen}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
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
