import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PageHeader from '../common/PageHeader';
import FormGroup from '../common/FormGroup';
import Pills from '../common/Pills';

interface CreateNoticeModalProps {
  visible: boolean;
  onClose: () => void;
}

interface NoticeForm {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: string;
}

const getPriorityStyle = (isActive: boolean) => {
  return {
    borderColor: isActive ? '#63C7A6' : '#f0f0f0',
  };
};

const CreateNoticeModal: React.FC<CreateNoticeModalProps> = ({
  visible,
  onClose,
}) => {
  const [formData, setFormData] = useState<NoticeForm>({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    priority: 'medium',
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <PageHeader onBack={onClose} title="Create Notice" />
          <ScrollView
            style={styles.formContent}
            showsVerticalScrollIndicator={false}>
            {/* Title Input */}
            <FormGroup label="Title">
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={text =>
                  setFormData(prev => ({...prev, title: text}))
                }
                placeholder="Enter notice title"
                placeholderTextColor="#999"
              />
            </FormGroup>
            <FormGroup label="Description">
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={text =>
                  setFormData(prev => ({...prev, description: text}))
                }
                placeholder="Enter notice description"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
            </FormGroup>
            <FormGroup label="Start Date">
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}>
                <MaterialIcons
                  name="calendar-month"
                  size={24}
                  color="#63C7A6"
                />
                <Text style={styles.dateButtonText}>
                  {formData.startDate.toLocaleString()}
                </Text>
              </TouchableOpacity>
            </FormGroup>
            <FormGroup label="End Date">
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}>
                <MaterialIcons
                  name="calendar-month"
                  size={24}
                  color="#63C7A6"
                />
                <Text style={styles.dateButtonText}>
                  {formData.endDate.toLocaleString()}
                </Text>
              </TouchableOpacity>
            </FormGroup>
            <FormGroup label="Priority">
              <Pills
                options={['high', 'medium', 'low']}
                selectedOption={formData.priority}
                onSelect={priority =>
                  setFormData(prev => ({...prev, priority}))
                }
              />
            </FormGroup>
          </ScrollView>

          {/* Submit Button */}
          <View style={styles.bottomButton}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Create Notice</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Pickers */}
        <DateTimePickerModal
          isVisible={showStartDatePicker}
          mode="datetime"
          onConfirm={date => {
            setFormData(prev => ({...prev, startDate: date}));
            setShowStartDatePicker(false);
          }}
          onCancel={() => setShowStartDatePicker(false)}
          minimumDate={new Date()}
        />
        <DateTimePickerModal
          isVisible={showEndDatePicker}
          mode="datetime"
          onConfirm={date => {
            setFormData(prev => ({...prev, endDate: date}));
            setShowEndDatePicker(false);
          }}
          onCancel={() => setShowEndDatePicker(false)}
          minimumDate={formData.startDate}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  formContent: {
    flex: 1,
    padding: 16,
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
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
    marginLeft: 12,
    fontSize: 16,
    color: '#2d3436',
  },
  bottomButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#63C7A6',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateNoticeModal;
