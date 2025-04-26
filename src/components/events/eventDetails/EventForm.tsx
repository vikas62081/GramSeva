import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {EventFormScreenProps} from '../types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FormGroup from '../../common/FormGroup';
import {formatDateTime} from '../../../utils';
import {placeholderTextColor} from '../../../theme';
import {useCreateEventMutation} from '../../../store/slices/eventApiSlice';
import {useGetFamiliesQuery} from '../../../store/slices/familyApiSlice';
import Dropdown from '../../common/Dropdown';
import {useTheme} from 'react-native-paper';
import {useHideTabBar} from '../../../hooks/ useHideTabBar';
import {useSnackbar} from '../../../context/SnackbarContext';
import FormModal from '../../common/FormModal';

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

const EventForm: React.FC<EventFormScreenProps> = ({onClose, onSuccess}) => {
  useHideTabBar();
  const initialData = null;
  const {colors} = useTheme();
  const {showSnackbar} = useSnackbar();
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
      showSnackbar('Event created successfully');
      onClose();
      onSuccess();
    } catch {
      showSnackbar('Something went wrong', 'error');
    }
  };

  const users = useMemo(
    () => people?.data.map(p => ({label: p.name, value: p.id + '-' + p.name})),
    [people],
  );

  return (
    <FormModal
      isLoading={isLoading}
      visible={true}
      onClose={onClose}
      title={initialData ? 'Edit Event' : 'Add Event'}
      onSubmit={handleSubmit}
      submitText={initialData ? 'Update Event' : 'Create Event'}>
      <ScrollView>
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
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="datetime"
          onConfirm={handleDateChange}
          onCancel={() => setShowDatePicker(false)}
        />
      </ScrollView>
    </FormModal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  formSection: {},
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
});

export default EventForm;
