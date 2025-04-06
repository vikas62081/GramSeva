import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PeopleScreen from '../screens/PeopleScreen';
import PeopleDetailsScreen from '../screens/PeopleDetails';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

// People Stack Navigator
const PeopleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PeopleList" component={PeopleScreen} />
      <Stack.Screen name="PeopleDetails" component={PeopleDetailsScreen} />
    </Stack.Navigator>
  );
};

export default PeopleStack;
