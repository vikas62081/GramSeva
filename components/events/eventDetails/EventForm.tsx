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
import DateTimePicker from '@react-native-community/datetimepicker';
import PageHeader from '../../common/PageHeader';

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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm(prev => ({...prev, date: selectedDate}));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            value={form.title}
            onChangeText={text => setForm(prev => ({...prev, title: text}))}
            placeholder="Enter event title"
          />

          <Text style={styles.label}>Description</Text>
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

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <MaterialIcons name="event" size={24} color="#666" />
            <Text style={styles.dateText}>{formatDate(form.date)}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Time</Text>
          <TextInput
            style={styles.input}
            value={form.time}
            onChangeText={text => setForm(prev => ({...prev, time: text}))}
            placeholder="Enter event time (e.g., 9:00 AM - 5:00 PM)"
          />

          <Text style={styles.label}>Venue</Text>
          <TextInput
            style={styles.input}
            value={form.venue}
            onChangeText={text => setForm(prev => ({...prev, venue: text}))}
            placeholder="Enter event venue"
          />

          <Text style={styles.label}>Event Head</Text>
          <TextInput
            style={styles.input}
            value={form.eventHead}
            onChangeText={text => setForm(prev => ({...prev, eventHead: text}))}
            placeholder="Enter event head name"
          />

          <Text style={styles.label}>Profile Picture URL</Text>
          <TextInput
            style={styles.input}
            value={form.profilePicture}
            onChangeText={text =>
              setForm(prev => ({...prev, profilePicture: text}))
            }
            placeholder="Enter profile picture URL"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {initialData ? 'Update Event' : 'Create Event'}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
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
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventForm;
