import React, {useEffect, useState} from 'react';
import LoadingScreen from '../components/LoadingScreen';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {event} from '../api/index';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import AddButton from '../assets/images/add.svg';

const Group = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const {groupName, groupId} = route.params;

  useEffect(() => {
    setIsLoading(value => !value);
    getEvents();
  }, []);

  const getEvents = async () => {
    const response = await event();
    const eventArray = Object.values(response.data.events);

    const filteredEventArray = eventArray.filter(
      item => item.group[0]._id === groupId,
    );
    setEvents(filteredEventArray);
    setIsLoading(value => !value);
  };

  return (
    <>
      <View style={styles.screenContainer}>
        <Header navigation={navigation} />
        <SafeAreaView style={styles.container}>
          <View style={styles.groupHeadingComponent}>
            <Image
              source={require('../assets/images/group.jpg')}
              style={styles.userPicture}
            />
            <Text style={styles.heading}>{groupName}</Text>
          </View>

          {isLoading ? (
            <LoadingScreen visible={isLoading} />
          ) : (
            <FlatList
              data={events}
              renderItem={({item}) => (
                <EventCard
                  groupName={item.group[0].name}
                  numberOfParticipants={item.group[0].members.length}
                  eventId={item._id}
                  eventName={item.name}
                  schedule={item.schedule}
                  responses={item.responses}
                  navigation={navigation}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
          <AddButton
            onPress={() =>
              navigation.navigate('Create Event', {
                groupId,
              })
            }
            style={styles.addButton}
          />
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingLeft: '5%',
  },
  addButton: {
    width: 60,
    height: 60,
    bottom: '2%',
    right: '5%',
    position: 'absolute',
  },
  userPicture: {
    width: 100,
    height: 100,
    borderRadius: 70,
  },
  groupHeadingComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '7%',
  },
});

export default Group;
