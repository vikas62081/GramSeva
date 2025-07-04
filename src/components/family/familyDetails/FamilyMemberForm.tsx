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
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../events/types';
import {genderOptions, relationshipOptions} from '../constants';
import FormModal from '../../common/FormModal';
import SerachSelectorListener from '../../common/SearchSelectorListener';

interface FamilyMemberFormProps {
  selectedMember?: FamilyMember | null;
  formData: FamilyMember;
  setFormData: React.Dispatch<
    React.SetStateAction<FamilyMemberFormProps['formData']>
  >;
  showDatePicker: boolean;
  setShowDatePicker: (val: boolean) => void;
  handleUpdateMember: () => void;
  handleAddMember: () => void;
  onClose: () => void;
  relatedTo: any[];
  isLoading: boolean;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({
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
  console.log('FamilyForm rendered with formData:', relatedTo);
  const {colors} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Subscribe to person selection events
  React.useEffect(() => {
    const unsubscribe = SerachSelectorListener.subscribe(member => {
      console.log('Selected member:', member);
      setFormData(prev => ({
        ...prev,
        parentId: member.value,
      }));
    });
    return unsubscribe;
  }, [setFormData]);
  return (
    <>
      <FormModal
        isLoading={isLoading}
        visible={true}
        onClose={onClose}
        title={selectedMember ? 'Edit Member' : 'Add Family Member'}
        onSubmit={selectedMember ? handleUpdateMember : handleAddMember}
        submitText={selectedMember ? 'Update Member' : 'Add Member'}>
        <ScrollView
          style={styles.formContent}
          contentContainerStyle={styles.scrollContent}>
          <FormGroup label="Full Name">
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={text =>
                setFormData(prev => ({...prev, name: text}))
              }
              placeholder="Enter name"
              placeholderTextColor={placeholderTextColor}
              textContentType="name"
            />
          </FormGroup>

          <FormGroup label="Date of Birth">
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.85}
              accessibilityLabel="Select date of birth">
              <MaterialIcons
                name="calendar-today"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.dateButtonText}>
                {formData.dob
                  ? formData.dob.toLocaleDateString()
                  : 'Select date'}
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

          <FormGroup label="Related To">
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
                navigation.navigate('FamilyMemberSelector', {
                  title: 'Choose Person',
                  members: relatedTo,
                });
              }}>
              <Text
                style={{
                  color: formData.parentId ? '#2D3436' : placeholderTextColor,
                  fontSize: 16,
                }}>
                {formData.parentId
                  ? relatedTo.find(r => r.value === formData.parentId)?.label ||
                    'Selected'
                  : 'Choose Person'}
              </Text>
              {/* <MaterialIcons name="search" size={20} color="#888" /> */}
            </TouchableOpacity>
          </FormGroup>

          <FormGroup label="Relationship">
            <Dropdown
              onChange={value =>
                setFormData(prev => ({...prev, relationship: value}))
              }
              items={relationshipOptions}
              placeholder={{label: 'Choose relationship...', value: null}}
              value={formData.relationship}
            />
          </FormGroup>
        </ScrollView>
      </FormModal>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={date => {
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
    paddingHorizontal: 8,
  },
  scrollContent: {
    paddingBottom: 24,
    gap: 16,
  },
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 0,
  },
  dateButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },
});

export default FamilyMemberForm;
