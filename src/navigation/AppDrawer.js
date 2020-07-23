import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {PRIMARY} from '../styles/colors';
import SideBar from '../components/SideBar';
import Events from '../screens/Events';
import Groups from '../screens/Groups';
import Settings from '../screens/Settings';
import Event from '../screens/Event';
import Group from '../screens/Group';
import GroupMembers from '../screens/GroupMembers';
import CreateEvent from '../screens/CreateEvent';
import CreateGroup from '../screens/CreateGroup';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import EventIcon from '../assets/images/Groups-Dark.svg';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const EventStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Event" component={Event} />
    </Stack.Navigator>
  );
};

const GroupStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Groups"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Groups" component={Groups} />
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="GroupMembers" component={GroupMembers} />
      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="Create Event" component={CreateEvent} />
    </Stack.Navigator>
  );
};

const AppDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="EventStack"
        backBehavior="initialRoute"
        drawerContent={props => <SideBar {...props} />}
        drawerContentOptions={{
          activeTintColor: '#fff',
          activeBackgroundColor: PRIMARY,
          inactiveTintColor: '#000',
          itemStyle: {
            marginHorizontal: 0,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 0,
          },
          labelStyle: {
            fontSize: 16,
          },
        }}>
        <Drawer.Screen
          name="Events"
          component={EventStack}
          options={{
            drawerIcon: config => (
              <Icon name={'calendar-day'} size={30} color="#000000" />
              // <FontAwesome
              //   style={{fontSize: 32}}
              //   icon={SolidIcons.calendarDay}
              // />
              // <EventIcon style={styles.eventIconStyle} />
            ),
          }}
        />
        <Drawer.Screen
          name="Groups"
          component={GroupStack}
          options={{
            drawerIcon: config => (
              <MaterialIcon name={'group'} size={35} color="#000000" />
              // <EventIcon style={styles.eventIconStyle} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: config => (
              <Icon name={'cog'} size={30} color="#000000" />
              // <EventIcon style={styles.eventIconStyle} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  eventIconStyle: {
    width: 70,
    height: 70,
  },
});

export default AppDrawer;
