import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EventFormScreenProps} from '../types';
import PageHeader from '../../common/PageHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FormGroup from '../../common/FormGroup';
import {formatDate} from '../../../utils';

const EventForm: React.FC<EventFormScreenProps> = ({route, navigation}) => {
  const initialData = route.params?.event;
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '',
    venue: '',
    eventHead: '',
    profilePicture: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        date: new Date(initialData.date),
        time: initialData.time,
        venue: initialData.venue,
        eventHead: initialData.eventHead,
        profilePicture: initialData.profilePicture,
      });
    }
  }, [initialData]);

  const handleDateChange = (selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm(prev => ({...prev, date: selectedDate}));
    }
  };

  const handleSubmit = () => {
    if (!form.title || !form.venue || !form.eventHead) {
      // Show error message
      return;
    }

    const eventData = {
      title: form.title,
      description: form.description,
      date: form.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      time: form.time,
      venue: form.venue,
      eventHead: form.eventHead,
      profilePicture: form.profilePicture,
    };

    // TODO: Implement event creation/update logic
    console.log('Submit event:', eventData);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <PageHeader
        onBack={() => navigation.goBack()}
        title={initialData ? 'Edit Event' : 'Add Event'}
      />

      <ScrollView style={styles.content}>
        <View style={styles.formSection}>
          <FormGroup label="Event Title">
            <TextInput
              style={styles.input}
              value={form.title}
              onChangeText={text => setForm(prev => ({...prev, title: text}))}
              placeholder="Enter event title"
            />
          </FormGroup>
          <FormGroup label="Description">
            <TextInput
              style={[styles.input, styles.textArea]}
              value={form.description}
              onChangeText={text =>
                setForm(prev => ({...prev, description: text}))
              }
              placeholder="Enter event description"
              multiline
              numberOfLines={4}
            />
          </FormGroup>

          <FormGroup label="Date">
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}>
              <MaterialIcons name="event" size={24} color="#63C7A6" />
              <Text style={styles.dateText}>
                {formatDate(form.date.toISOString())}
              </Text>
            </TouchableOpacity>
          </FormGroup>
          <FormGroup label="Venue">
            <TextInput
              style={styles.input}
              value={form.venue}
              onChangeText={text => setForm(prev => ({...prev, venue: text}))}
              placeholder="Enter event venue"
            />
          </FormGroup>
          <FormGroup label="Event Head">
            <TextInput
              style={styles.input}
              value={form.eventHead}
              onChangeText={text =>
                setForm(prev => ({...prev, eventHead: text}))
              }
              placeholder="Enter event head name"
            />
          </FormGroup>
          <FormGroup label="Profile Picture URL">
            <TextInput
              style={styles.input}
              value={form.profilePicture}
              onChangeText={text =>
                setForm(prev => ({...prev, profilePicture: text}))
              }
              placeholder="Enter profile picture URL"
            />
          </FormGroup>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {initialData ? 'Update Event' : 'Create Event'}
          </Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  formSection: {
    padding: 20,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2d3436',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  dateText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#2d3436',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
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

export default EventForm;
