import React, {useState} from 'react';
import {ScrollView, TextInput, StyleSheet, Alert} from 'react-native';
import {Family, FamilyMember} from './types';
import FormGroup from '../common/FormGroup';
import FormModal from '../common/FormModal';
import Pills from '../common/Pills';

interface AddFamilyFormProps {
  selectedMember?: FamilyMember | null;
  onSave: (family: Family) => void;
  onClose: () => void;
}

const AddFamilyForm: React.FC<AddFamilyFormProps> = ({
  selectedMember,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Family>({
    name: '',
    phone: '',
    gender: 'male',
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
        visible={true}
        onClose={onClose}
        title={selectedMember ? 'Edit Family' : 'Add Family'}
        onSubmit={handleSave}
        submitText={selectedMember ? 'Update Family' : 'Add Family'}>
        <ScrollView style={styles.formContent}>
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
              options={['male', 'female']}
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
  formContent: {
    paddingHorizontal: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3436',
  },
});

export default AddFamilyForm;
