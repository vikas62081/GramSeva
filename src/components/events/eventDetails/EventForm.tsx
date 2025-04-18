import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EventFormScreenProps} from '../types';
import PageHeader from '../../common/PageHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FormGroup from '../../common/FormGroup';
import {formatDateTime} from '../../../utils';
import {placeholderTextColor} from '../../../theme';
import {useCreateEventMutation} from '../../../store/slices/eventApiSlice';
import LoadingSpinner from '../../common/LoadingSpinner';
import {Button} from 'react-native-paper';
import {useGetFamiliesQuery} from '../../../store/slices/familyApiSlice';
import Dropdown from '../../common/Dropdown';
import {useTheme} from 'react-native-paper';
import {useHideTabBar} from '../../../hooks/ useHideTabBar';

interface EventForm {
  title: string;
  description: string;
  date: Date;
  venue: string;
  eventHead: {
    user_id: string;
    name: string;
  };
  thumbnail_url: string;
}

const EventForm: React.FC<EventFormScreenProps> = ({route, navigation}) => {
  useHideTabBar();
  const initialData = route.params?.event;
  const {colors} = useTheme();
  const [createEvent, {isLoading}] = useCreateEventMutation();
  const {data: people} = useGetFamiliesQuery({
    limit: 100,
  });

  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    date: new Date(),
    venue: '',
    eventHead: {user_id: 'head_id', name: ''},
    thumbnail_url: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      const {title, description, date, venue, eventHead, thumbnail_url} =
        initialData;
      setForm({
        title,
        description,
        date: new Date(date),
        venue,
        eventHead,
        thumbnail_url,
      });
    }
  }, [initialData]);

  const handleDateChange = (selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm(prev => ({...prev, date: selectedDate}));
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.venue || !form.eventHead.user_id) {
      Alert.alert('Missing Fields', 'Please complete all the required fields.');
      return;
    }
    const [user_id, name] = form.eventHead.user_id.split('-');
    const eventData = {
      title: form.title,
      description: form.description,
      date: new Date(form.date).toISOString(),
      venue: form.venue,
      eventHead: {user_id, name},
      thumbnail_url: form.thumbnail_url,
    };
    try {
      await createEvent(eventData).unwrap();
      console.log('Submit event:', eventData);
      navigation.goBack();
    } catch {}
  };

  const users = useMemo(
    () => people?.data.map(p => ({label: p.name, value: p.id + '-' + p.name})),
    [people],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LoadingSpinner loading={isLoading}>
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
                placeholderTextColor={placeholderTextColor}
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
                placeholderTextColor={placeholderTextColor}
              />
            </FormGroup>

            <FormGroup label="Date">
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}>
                <MaterialIcons name="event" size={24} color={colors.primary} />
                <Text style={styles.dateText}>
                  {formatDateTime(form.date.toISOString())}
                </Text>
              </TouchableOpacity>
            </FormGroup>
            <FormGroup label="Venue">
              <TextInput
                style={styles.input}
                value={form.venue}
                onChangeText={text => setForm(prev => ({...prev, venue: text}))}
                placeholder="Enter event venue"
                placeholderTextColor={placeholderTextColor}
              />
            </FormGroup>
            <FormGroup label="Event Head">
              <Dropdown
                onChange={value => {
                  setForm(prev => ({
                    ...prev,
                    eventHead: {user_id: value, name: value},
                  }));
                }}
                items={users || []}
                placeholder={{label: 'Choose Event Head...', value: null}}
                value={form.eventHead.user_id}
              />
            </FormGroup>
            <FormGroup label="Profile Picture URL">
              <TextInput
                style={styles.input}
                value={form.thumbnail_url}
                onChangeText={text =>
                  setForm(prev => ({...prev, thumbnail_url: text}))
                }
                placeholder="Enter profile picture URL"
                placeholderTextColor={placeholderTextColor}
              />
            </FormGroup>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={handleSubmit}>
            {initialData ? 'Update Event' : 'Create Event'}
          </Button>
        </View>
      </LoadingSpinner>

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
    padding: 8,
  },
});

export default EventForm;
