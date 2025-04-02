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

interface CreateNoticeModalProps {
  visible: boolean;
  onClose: () => void;
}

interface NoticeForm {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: 'high' | 'medium' | 'low';
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
    priority: 'low',
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
    console.log('Form submitted:', formData);
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
            <View style={styles.section}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={text =>
                  setFormData(prev => ({...prev, title: text}))
                }
                placeholder="Enter notice title"
                placeholderTextColor="#999"
              />
            </View>

            {/* Description Input */}
            <View style={styles.section}>
              <Text style={styles.label}>Description</Text>
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
            </View>

            {/* Start Date */}
            <View style={styles.section}>
              <Text style={styles.label}>Start Date</Text>
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
            </View>

            {/* End Date */}
            <View style={styles.section}>
              <Text style={styles.label}>End Date</Text>
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
            </View>

            {/* Priority Selection */}
            <View style={styles.section}>
              <Text style={styles.label}>Priority</Text>
              <View style={styles.priorityContainer}>
                <TouchableOpacity
                  style={[
                    styles.priorityPill,
                    getPriorityStyle(formData.priority === 'high'),
                  ]}
                  onPress={() =>
                    setFormData(prev => ({...prev, priority: 'high'}))
                  }>
                  <Text>High</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priorityPill,
                    getPriorityStyle(formData.priority === 'medium'),
                  ]}
                  onPress={() =>
                    setFormData(prev => ({...prev, priority: 'medium'}))
                  }>
                  <Text>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.priorityPill,
                    getPriorityStyle(formData.priority === 'low'),
                  ]}
                  onPress={() =>
                    setFormData(prev => ({...prev, priority: 'low'}))
                  }>
                  <Text>Low</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 16,
  },
  formContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2d3436',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  dateButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#2d3436',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityPill: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: '#f0f0f0',
  },
  priorityPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  priorityPillTextActive: {
    color: '#ffffff',
  },
  bottomButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#63C7A6',
    padding: 16,
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
