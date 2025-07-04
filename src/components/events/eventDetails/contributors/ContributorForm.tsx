import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import FormModal from '../../../common/FormModal';
import {IContributorForm, Contributor} from '../../types';
import {placeholderTextColor} from '../../../../theme';
import FormGroup from '../../../common/FormGroup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import SearchSelectorListener from '../../../common/SearchSelectorListener';

interface ContributorFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Contributor) => void;
  initialData?: IContributorForm;
  isLoading: boolean;
}

const initialFormValue = {name: '', amount: ''};

const ContributorForm: React.FC<ContributorFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [form, setForm] = useState<IContributorForm>(initialFormValue);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Subscribe to person selection events
  React.useEffect(() => {
    const unsubscribe = SearchSelectorListener.subscribe(person => {
      setForm(prev => ({
        ...prev,
        name: person.name,
        user_id: person.id,
      }));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      return;
    }
    setForm(initialFormValue);
  }, [initialData]);

  console.log('ContributorForm rendered with form:', form);

  const handleSubmit = () => {
    if (!form.name || !form.amount) {
      Alert.alert('Missing Fields', 'Please select contributor and amount.');
      return;
    }
    onSubmit({
      name: form.name,
      amount: parseFloat(form.amount),
      user_id: form.user_id || '',
    });
    setForm(initialFormValue);
  };

  return (
    <FormModal
      isLoading={isLoading}
      visible={visible}
      onClose={onClose}
      title={initialData ? 'Edit Contributor' : 'Add Contributor'}
      onSubmit={handleSubmit}
      submitText={initialData ? 'Update' : 'Add'}>
      <FormGroup label="Name">
        <TouchableOpacity
          style={[
            styles.input,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => {
            navigation.navigate('FamilyHeadSelector', {
              title: 'Select Contributor',
            });
          }}>
          <Text
            style={{
              color: form.name ? '#2D3436' : placeholderTextColor,
            }}>
            {form.name ?? 'Select contributor'}
          </Text>
        </TouchableOpacity>
      </FormGroup>
      <FormGroup label="Amount">
        <TextInput
          style={styles.input}
          value={form.amount?.toString()}
          onChangeText={text => {
            const filtered = text.replace(/[^0-9.]/g, '');
            setForm(prev => ({...prev, amount: filtered}));
          }}
          placeholder="Enter amount"
          keyboardType="numeric"
          placeholderTextColor={placeholderTextColor}
        />
      </FormGroup>
    </FormModal>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 0,
  },
});

export default ContributorForm;
