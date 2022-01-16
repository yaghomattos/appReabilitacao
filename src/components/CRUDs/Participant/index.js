import { LogBox } from 'react-native';
import { database } from '../../../services/firebase';

LogBox.ignoreLogs(['Setting a timer']);

export async function readParticipant(props) {
  var participant = '';
  const participantRef = database
    .ref('participant')
    .orderByChild('cpf')
    .equalTo(props)
    .once('child_added', function (snapshot) {
      participant = snapshot;
    });

  if (participant != undefined && participantRef != '') {
    return participant;
  } else {
    console.log('Participant does not exists.');
    return false;
  }
}

export async function readParticipantId(props) {
  const participantRef = await database.ref(`participant/${props}`).get();

  if (!participantRef.exists()) {
    console.log('Participant does not exists.');
    return;
  } else {
    return participantRef;
  }
}
