import React from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormGroup from '../../common/FormGroup';
import Pills from '../../common/Pills';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {FamilyMember} from '../types';
import {placeholderTextColor} from '../../../theme';
import Dropdown from '../../common/Dropdown';
import {Text, useTheme} from 'react-native-paper';
import {genderOptions, relationshipOptions} from '../constants';
import FormModal from '../../common/FormModal';

interface FamilyFormProps {
  selectedMember?: FamilyMember | null;
  formData: FamilyMember;
  setFormData: React.Dispatch<
    React.SetStateAction<FamilyFormProps['formData']>
  >;
  showDatePicker: boolean;
  setShowDatePicker: (val: boolean) => void;
  handleUpdateMember: () => void;
  handleAddMember: () => void;
  onClose: () => void;
  relatedTo: any[];
  isLoading: boolean;
}

const FamilyForm: React.FC<FamilyFormProps> = ({
  selectedMember,
  formData,
  setFormData,
  showDatePicker,
  setShowDatePicker,
  handleUpdateMember,
  handleAddMember,
  onClose,
  relatedTo,
  isLoading,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <FormModal
        isLoading={isLoading}
        visible={true}
        onClose={onClose}
        title={selectedMember ? 'Edit Member' : 'Add Family Member'}
        onSubmit={selectedMember ? handleUpdateMember : handleAddMember}
        submitText={selectedMember ? 'Update Member' : 'Add Member'}>
        <ScrollView style={styles.formContent}>
          <FormGroup label="Full Name">
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={text =>
                setFormData(prev => ({...prev, name: text}))
              }
              placeholder="Enter name"
              placeholderTextColor={placeholderTextColor}
            />
          </FormGroup>

          <FormGroup label="Date of Birth">
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}>
              <MaterialIcons
                name="calendar-today"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.dateButtonText}>
                {formData.dob.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </FormGroup>

          <FormGroup label="Gender">
            <Pills
              options={genderOptions}
              selectedOption={formData.gender}
              onSelect={gender => setFormData(prev => ({...prev, gender}))}
            />
          </FormGroup>

          <FormGroup label="Relationship to You">
            <Dropdown
              onChange={value =>
                setFormData(prev => ({...prev, relationship: value}))
              }
              items={relationshipOptions}
              placeholder={{label: 'Choose relationship...', value: null}}
              value={formData.relationship}
            />
          </FormGroup>

          <FormGroup label="Related To">
            <Dropdown
              onChange={value =>
                setFormData(prev => ({...prev, parentId: value}))
              }
              items={relatedTo}
              placeholder={{label: 'Choose person...', value: null}}
              value={formData.parentId}
            />
          </FormGroup>
        </ScrollView>
      </FormModal>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={date => {
          console.log(date);
          setFormData(prev => ({...prev, dob: date}));
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        maximumDate={new Date()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  formContent: {
    paddingTop: 12,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3436',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  dateButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default FamilyForm;
