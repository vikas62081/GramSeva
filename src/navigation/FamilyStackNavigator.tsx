import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './types';
import FamilyScreen from '../screens/FamilyScreen';
import FamilyDetailsScreen from '../screens/FamilyDetails';
import FamilyMemberSelector from '../components/common/FamilyMemberSelector';

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
      <Stack.Screen
        name="FamilyMemberSelector"
        options={{animation: 'fade'}}
        component={FamilyMemberSelector}
      />
    </Stack.Navigator>
  );
};

export default FamilyStack;
