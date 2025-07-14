import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import PageHeader from '../components/common/PageHeader';

import {
  FamilyDetailsScreenNavigationProp,
  FamilyDetailsScreenRouteProp,
} from '../navigation/types';
import FamilyDetailsContainer from '../components/family/familyDetails';
import {Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const FamilyDetailsScreen: React.FC = ({route}: any) => {
  const navigation = useNavigation<FamilyDetailsScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Family Details" onBack={() => navigation.goBack()} />
      <Surface style={styles.content}>
        <FamilyDetailsContainer navigation={navigation} route={route} />
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default FamilyDetailsScreen;
