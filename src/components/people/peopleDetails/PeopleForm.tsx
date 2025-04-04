import React from 'react';
import {
  Modal,
  View,
  Text,
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

interface PeopleFormProps {
  selectedMember?: FamilyMember | null;
  formData: {
    name: string;
    dob: Date;
    gender: string;
    relationship: string;
    relationshipWith: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<PeopleFormProps['formData']>
  >;
  showDatePicker: boolean;
  setShowDatePicker: (val: boolean) => void;
  handleUpdateMember: () => void;
  handleAddMember: () => void;
  onClose: () => void;
}

const PeopleForm: React.FC<PeopleFormProps> = ({
  selectedMember,
  formData,
  setFormData,
  showDatePicker,
  setShowDatePicker,
  handleUpdateMember,
  handleAddMember,
  onClose,
}) => {
  return (
    <>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedMember ? 'Edit Member' : 'Add Family Member'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContent}>
            <FormGroup label="Name">
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={text =>
                  setFormData(prev => ({...prev, name: text}))
                }
                placeholder="Enter name"
              />
            </FormGroup>

            <FormGroup label="Date of Birth">
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}>
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color="#63C7A6"
                />
                <Text style={styles.dateButtonText}>
                  {formData.dob.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </FormGroup>

            <FormGroup label="Gender">
              <Pills
                options={['male', 'female']}
                selectedOption={formData.gender}
                onSelect={gender => setFormData(prev => ({...prev, gender}))}
              />
            </FormGroup>

            <FormGroup label="Relationship">
              <TextInput
                style={styles.input}
                value={formData.relationship}
                onChangeText={text =>
                  setFormData(prev => ({...prev, relationship: text}))
                }
                placeholder="Enter relationship"
              />
            </FormGroup>

            <FormGroup label="Relationship With">
              <TextInput
                style={styles.input}
                value={formData.relationshipWith}
                onChangeText={text =>
                  setFormData(prev => ({...prev, relationshipWith: text}))
                }
                placeholder="Enter relationship with"
              />
            </FormGroup>
          </ScrollView>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={selectedMember ? handleUpdateMember : handleAddMember}>
            <Text style={styles.submitButtonText}>
              {selectedMember ? 'Update Member' : 'Add Member'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  familyImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  familyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  familyRole: {
    fontSize: 16,
    color: '#636E72',
  },
  membersSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  addButton: {
    backgroundColor: '#63C7A6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3436',
    marginBottom: 4,
  },
  memberDetails: {
    fontSize: 14,
    color: '#636E72',
  },
  editButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
  },
  closeButton: {
    padding: 8,
  },
  formContent: {
    padding: 16,
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
    marginLeft: 12,
    fontSize: 16,
    color: '#2D3436',
  },
  submitButton: {
    backgroundColor: '#63C7A6',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default PeopleForm;
