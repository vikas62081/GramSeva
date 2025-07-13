import React, {useState} from 'react';
import {ScrollView, TextInput, StyleSheet, Alert} from 'react-native';
import {Family, FamilyMember} from './types';
import FormGroup from '../common/FormGroup';
import FormModal from '../common/FormModal';
import Pills from '../common/Pills';
import {genderOptions} from './constants';
import {useTheme} from 'react-native-paper';
import {normalizeObjectStrings} from '../../utils';

interface AddFamilyFormProps {
  selectedMember?: FamilyMember | null;
  onSave: (family: Family) => void;
  onClose: () => void;
  isLoading: boolean;
}

const AddFamilyForm: React.FC<AddFamilyFormProps> = ({
  selectedMember,
  onSave,
  onClose,
  isLoading,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Family>({
    name: '',
    phone: '',
    gender: 'Male',
    members: 0,
    relationship: 'head',
  });

  const handleSave = () => {
    if (!formData.name || !formData.phone) {
      Alert.alert('Missing Fields', 'Please complete all the required fields.');
      return;
    }
    onSave(normalizeObjectStrings(formData));
  };

  return (
    <>
      <FormModal
        isLoading={isLoading}
        visible={true}
        onClose={onClose}
        title={selectedMember ? 'Edit Family' : 'Add Family'}
        onSubmit={handleSave}
        submitText={selectedMember ? 'Update Family' : 'Add Family'}>
        <ScrollView>
          <FormGroup label="Full Name">
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.onSurface,
                  borderColor: theme.colors.outline,
                },
              ]}
              value={formData.name}
              onChangeText={text =>
                setFormData(prev => ({...prev, name: text}))
              }
              placeholder="Enter name"
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
          </FormGroup>

          <FormGroup label="Phone Number">
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.onSurface,
                  borderColor: theme.colors.outline,
                },
              ]}
              value={formData.phone}
              onChangeText={text =>
                setFormData(prev => ({...prev, phone: text}))
              }
              placeholder="Enter phone number"
              placeholderTextColor={theme.colors.onSurfaceVariant}
              keyboardType="phone-pad"
            />
          </FormGroup>
          <FormGroup label="Gender">
            <Pills
              options={genderOptions}
              selectedOption={formData.gender}
              onSelect={gender => setFormData(prev => ({...prev, gender}))}
            />
          </FormGroup>
        </ScrollView>
      </FormModal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 0,
  },
});

export default AddFamilyForm;
