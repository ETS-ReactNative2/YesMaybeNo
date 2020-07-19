import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Yes from '../assets/images/Green bubble.svg';
import Maybe from '../assets/images/Grey bubble.svg';
import No from '../assets/images/Red bubble.svg';
import YesNo from '../assets/images/Yes-No.svg';
import NoMaybe from '../assets/images/No-Maybe.svg';
import YesMaybe from '../assets/images/Yes-Maybe.svg';
import YesMaybeNo from '../assets/images/Yes-Maybe-No.svg';
import {PRIMARY, HEADING, PLACEHOLDER} from '../styles/colors';
import LocationLogo from '../assets/images/Location.svg';
import {UserContext} from '../navigation/AppNavigator';
import {max} from 'react-native-reanimated';

const EventCard = props => {
  const {setUser, user} = useContext(UserContext);
  const [bubble, setBubble] = useState('');

  const convertDate = dbDate => {
    const date = new Date(dbDate);
    return date.toDateString().substring(4);
  };

  const getEventTime = dbDate => {
    const time = new Date(dbDate);
    return time.toLocaleTimeString().substring(0, 5);
  };

  const getUserResponse = responses => {
    let userResponse;
    if (responses.length === 0) return null;
    for (response of responses)
      if (response.user === user._id) {
        userResponse = response.response;
        break;
      }

    if (userResponse === 'yes') return <Yes />;
    else if (userResponse === 'no') return <No />;
    else if (userResponse === 'maybe') return <Maybe />;
    else return null;
  };

  const maxResponses = responses => {
    let yes = 0,
      maybe = 0,
      no = 0;

    if (responses.length === 0) return null;
    for (response of responses) {
      if (response.response == 'yes') yes += 1;
      else if (response.response == 'maybe') maybe += 1;
      else if (response.response == 'no') no += 1;
    }

    if (yes === maybe && maybe === no) return <YesMaybeNo />;
    else {
      if (yes === maybe) {
        if (yes > no) return <YesMaybe />;
        else return <No />;
      } else if (no === maybe) {
        if (no > yes) return <NoMaybe />;
        else return <Yes />;
      } else if (yes === no) {
        if (yes > maybe) return <YesNo />;
        else return <Maybe />;
      } else {
        if (yes > maybe && yes > no) return <Yes />;
        else if (maybe > yes && maybe > no) return <Maybe />;
        else return <No />;
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() =>
        props.navigation.navigate('Event', {
          groupName: props.groupName,
          numberOfParticipants: props.numberOfParticipants,
          eventId: props.eventId,
        })
      }>
      <View style={styles.headingComponent}>
        <Text style={styles.eventHeading}>{props.eventName}</Text>
        <View style={styles.bubble}>{maxResponses(props.responses)}</View>
      </View>
      <View style={styles.horizontalComponent}>
        <LocationLogo style={styles.location} />
        <Text style={styles.eventLocation}>No location</Text>
      </View>
      <View style={styles.eventData}>
        <View style={styles.verticalComponent}>
          <Text style={styles.eventSchedule}>
            {convertDate(props.schedule)}
          </Text>
          <Text style={styles.eventSchedule}>
            {getEventTime(props.schedule)}
          </Text>
        </View>
        <Text style={styles.eventGroup}>{props.groupName}</Text>
        <View style={styles.responseComponent}>
          <Text style={styles.eventResponse}>Response</Text>
          <View style={styles.bubble}>{getUserResponse(props.responses)}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  bubble: {
    width: 55,
    height: 55,
    marginTop: 5,
  },
  headingComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1%',
  },
  eventCard: {
    paddingHorizontal: '10%',
    paddingVertical: '2%',
    backgroundColor: '#fff',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {width: 2, height: 3},
    // shadowOpacity: 0.8,
    // shadowRadius: 10,
    // elevation: 2,
    marginBottom: '6%',
  },
  eventHeading: {
    fontSize: 23,
    fontWeight: 'bold',
    marginRight: '3%',
  },
  horizontalComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: 'bold',
  },
  verticalComponent: {
    marginTop: '2%',
    marginBottom: '8%',
  },
  eventSchedule: {
    fontSize: 16,
    fontWeight: 'bold',
    color: HEADING,
    paddingTop: 5,
  },
  eventGroup: {
    fontSize: 14,
    color: PLACEHOLDER,
  },
  responseComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  eventResponse: {
    fontSize: 16,
    fontWeight: 'bold',
    color: HEADING,
  },
  eventData: {
    marginLeft: 28,
  },
  lottie: {
    width: 70,
    height: 70,
  },
  location: {
    width: 45,
    height: 45,
    marginLeft: -15,
  },
});

export default EventCard;
