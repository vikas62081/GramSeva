import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import PageHeader from '../components/common/PageHeader';

import {
  FamilyDetailsScreenNavigationProp,
  FamilyDetailsScreenRouteProp,
} from '../navigation/types';
import FamilyDetailsContainer from '../components/family/familyDetails';

interface FamilyDetailsScreenProps {
  navigation: FamilyDetailsScreenNavigationProp;
  route: FamilyDetailsScreenRouteProp;
}

const FamilyDetailsScreen: React.FC<FamilyDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Family Details" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <FamilyDetailsContainer navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default FamilyDetailsScreen;
