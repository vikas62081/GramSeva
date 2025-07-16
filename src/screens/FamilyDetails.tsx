import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import PageHeader from '../components/common/PageHeader';

import {FamilyDetailsScreenNavigationProp} from '../navigation/types';
import FamilyDetailsContainer from '../components/family/familyDetails';
import {Appbar, Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useFamilyRefresh} from '../hooks/useFamilyRefresh';

const FamilyDetailsScreen: React.FC = ({route}: any) => {
  const {familyId} = route.params || {};
  const navigation = useNavigation<FamilyDetailsScreenNavigationProp>();
  const {refreshing, onRefresh} = useFamilyRefresh(familyId);
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Family Details" onBack={() => navigation.goBack()}>
        <Appbar.Action
          disabled={refreshing}
          icon="refresh"
          onPress={onRefresh}
        />
      </PageHeader>
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
