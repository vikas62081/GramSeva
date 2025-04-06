import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './types';
import FamilyScreen from '../screens/FamilyScreen';
import FamilyDetailsScreen from '../screens/FamilyDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Family Stack Navigator
const FamilyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FamilyList" component={FamilyScreen} />
      <Stack.Screen name="FamilyDetails" component={FamilyDetailsScreen} />
    </Stack.Navigator>
  );
};

export default FamilyStack;
