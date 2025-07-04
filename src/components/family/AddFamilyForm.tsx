import React, {useState} from 'react';
import {ScrollView, TextInput, StyleSheet, Alert} from 'react-native';
import {Family, FamilyMember} from './types';
import FormGroup from '../common/FormGroup';
import FormModal from '../common/FormModal';
import Pills from '../common/Pills';
import {genderOptions} from './constants';

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
    onSave(formData);
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
              style={styles.input}
              value={formData.name}
              onChangeText={text =>
                setFormData(prev => ({...prev, name: text}))
              }
              placeholder="Enter name"
              placeholderTextColor="#aaa"
            />
          </FormGroup>

          <FormGroup label="Phone Number">
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={text =>
                setFormData(prev => ({...prev, phone: text}))
              }
              placeholder="Enter phone number"
              placeholderTextColor="#aaa"
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

export default AddFamilyForm;
