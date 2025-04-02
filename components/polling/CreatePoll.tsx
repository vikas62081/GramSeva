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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/native';
import {PollingStackNavigationProp} from '../../types/navigation';
import PageHeader from '../common/PageHeader';

interface PollForm {
  question: string;
  options: string[];
  endDate: Date;
}

const CreatePoll = (): React.JSX.Element => {
  const navigation = useNavigation<PollingStackNavigationProp>();
  const [formData, setFormData] = useState<PollForm>({
    question: '',
    options: ['', ''], // Initialize with two empty options
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Default 24h from now
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const addOption = () => {
    if (formData.options.length >= 5) {
      Alert.alert('Limit Reached', 'Maximum 5 options allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, ''],
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length <= 2) {
      Alert.alert('Error', 'Minimum two options are required');
      return;
    }
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!formData.question.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }
    if (formData.options.some(opt => !opt.trim())) {
      Alert.alert('Error', 'All options must be filled');
      return;
    }
    console.log('Form submitted:', formData);
    // Handle submission
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader onBack={() => navigation.goBack()} title="Create Poll" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.questionInput}
            value={formData.question}
            onChangeText={text =>
              setFormData(prev => ({...prev, question: text}))
            }
            placeholder="Ask a question..."
            placeholderTextColor="#999"
            multiline
          />
        </View>

        {/* Options */}
        <View style={styles.section}>
          <Text style={styles.label}>Options</Text>
          {formData.options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <TextInput
                style={styles.optionInput}
                value={option}
                onChangeText={text => {
                  const newOptions = [...formData.options];
                  newOptions[index] = text;
                  setFormData(prev => ({...prev, options: newOptions}));
                }}
                placeholder={`Option ${index + 1}`}
                placeholderTextColor="#999"
              />
              {index >= 2 && (
                <TouchableOpacity
                  onPress={() => removeOption(index)}
                  style={styles.removeButton}>
                  <Icon name="close" size={24} color="#ff4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={addOption} style={styles.addOptionButton}>
            <Icon name="add-circle-outline" size={24} color="#63C7A6" />
            <Text style={styles.addOptionText}>Add Option</Text>
          </TouchableOpacity>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.label}>Poll Duration</Text>
          <TouchableOpacity
            style={styles.durationButton}
            onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar-month" size={24} color="#63C7A6" />
            <Text style={styles.durationText}>
              Ends {formData.endDate.toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
          <Text style={styles.createButtonText}>Create Poll</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={date => {
          setFormData(prev => ({...prev, endDate: date}));
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={new Date()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  questionInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#2d3436',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2d3436',
  },
  removeButton: {
    marginLeft: 12,
    padding: 4,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#63C7A6',
    borderStyle: 'dashed',
  },
  addOptionText: {
    color: '#63C7A6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  durationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  durationText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#2d3436',
  },
  bottomButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  createButton: {
    backgroundColor: '#63C7A6',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreatePoll;
