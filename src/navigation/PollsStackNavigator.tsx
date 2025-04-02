import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PollingContainer from '../components/polling';
import CreatePoll from '../components/polling/CreatePoll';
import VotingScreen from '../components/polling/VotingScreen';

const Stack = createNativeStackNavigator();

// Polling Stack Navigator
const PollingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PollingList" component={PollingContainer} />
      <Stack.Screen name="CreatePoll" component={CreatePoll} />
      <Stack.Screen name="VotingScreen" component={VotingScreen} />
    </Stack.Navigator>
  );
};

export default PollingStack;
