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
import {PollingStackNavigationProp} from '../../../types/navigation';
import PageHeader from '../common/PageHeader';
import FormGroup from '../common/FormGroup';
import {placeholderTextColor} from '../../theme';

interface PollForm {
  question: string;
  options: string[];
  endDate: Date;
}

const CreatePoll = (): React.JSX.Element => {
  const navigation = useNavigation<PollingStackNavigationProp>();
  const [formData, setFormData] = useState<PollForm>({
    question: '',
    options: ['', ''],
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleQuestionChange = (text: string) =>
    setFormData(prev => ({...prev, question: text}));

  const handleOptionChange = (text: string, index: number) => {
    const newOptions = [...formData.options];
    newOptions[index] = text;
    setFormData(prev => ({...prev, options: newOptions}));
  };

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
    const {question, options} = formData;

    if (!question.trim()) {
      Alert.alert('Validation Error', 'Please enter a poll question');
      return;
    }

    if (options.some(opt => !opt.trim())) {
      Alert.alert('Validation Error', 'Please fill out all options');
      return;
    }

    // Replace with API call or state dispatch
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader onBack={() => navigation.goBack()} title="Create Poll" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FormGroup label="Question">
          <TextInput
            style={styles.questionInput}
            value={formData.question}
            onChangeText={handleQuestionChange}
            placeholder="Ask a question..."
            placeholderTextColor={placeholderTextColor}
            multiline
          />
        </FormGroup>

        <FormGroup label="Options">
          {formData.options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
              <TextInput
                style={styles.optionInput}
                value={option}
                onChangeText={text => handleOptionChange(text, index)}
                placeholder={`Option ${index + 1}`}
                placeholderTextColor={placeholderTextColor}
              />
              {index >= 2 && (
                <TouchableOpacity
                  onPress={() => removeOption(index)}
                  style={styles.removeButton}>
                  <Icon name="close" size={22} color="#ff4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity onPress={addOption} style={styles.addOptionButton}>
            <Icon name="add-circle-outline" size={22} color="#63C7A6" />
            <Text style={styles.addOptionText}>Add Option</Text>
          </TouchableOpacity>
        </FormGroup>

        <FormGroup label="Poll Ends On">
          <TouchableOpacity
            style={styles.durationButton}
            onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar-month" size={22} color="#63C7A6" />
            <Text style={styles.durationText}>
              {formData.endDate.toLocaleString()}
            </Text>
          </TouchableOpacity>
        </FormGroup>
      </ScrollView>

      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
          <Text style={styles.createButtonText}>Create Poll</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 0,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionInput: {
    flex: 1,
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
  removeButton: {
    marginLeft: 10,
    padding: 4,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#63C7A6',
    borderStyle: 'dashed',
    marginTop: 4,
  },
  addOptionText: {
    color: '#63C7A6',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  durationButton: {
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
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreatePoll;
