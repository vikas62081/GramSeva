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
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '../../../store/slices/eventApiSlice';
import {useTheme} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import SearchSelectorListener from '../../common/SearchSelectorListener';
import {useHideTabBar} from '../../../hooks/ useHideTabBar';
import {useSnackbar} from '../../../context/SnackbarContext';
import FormModal from '../../common/FormModal';

const eventInitialState = {
  title: '',
  description: '',
  date: new Date(),
  venue: '',
  eventHead: {user_id: '', name: ''},
  thumbnail_url: '',
};
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

const EventForm: React.FC<EventFormScreenProps> = ({
  onClose,
  onSuccess,
  initialData,
}) => {
  useHideTabBar();
  const {colors} = useTheme();
  const {showSnackbar} = useSnackbar();
  const [createEvent, {isLoading}] = useCreateEventMutation();
  const [updateEvent, {isLoading: isUploading}] = useUpdateEventMutation();

  const [form, setForm] = useState<EventForm>(
    initialData
      ? {
          ...initialData,
          date: new Date(initialData.date),
        }
      : eventInitialState,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        date: new Date(initialData.date),
      });
    }
  }, [initialData]);

  // Subscribe to person selection events
  useEffect(() => {
    const unsubscribe = SearchSelectorListener.subscribe(person => {
      setForm(prev => ({
        ...prev,
        eventHead: {user_id: person.id, name: person.name},
      }));
    });
    return unsubscribe;
  }, []);

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
    const eventData = {
      title: form.title,
      description: form.description,
      date: new Date(form.date).toISOString(),
      venue: form.venue,
      eventHead: form.eventHead,
      thumbnail_url: form.thumbnail_url,
    };

    try {
      let msg = 'Event created successfully';
      if (initialData) {
        await updateEvent({eventId: initialData.id, event: eventData}).unwrap();
        msg = 'Event updated successfully';
      } else {
        await createEvent(eventData).unwrap();
      }
      showSnackbar(msg);
      onClose();
      onSuccess();
    } catch {
      showSnackbar('Something went wrong', 'error');
    }
  };

  return (
    <FormModal
      isLoading={isLoading || isUploading}
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
                  navigation.navigate('FamilyHeadSelector', {
                    title: 'Select Event Head',
                  });
                }}>
                <Text
                  style={{
                    color: form.eventHead.name
                      ? '#2d3436'
                      : placeholderTextColor,
                    fontSize: 16,
                  }}>
                  {form.eventHead.name || 'Choose Event Head...'}
                </Text>
                {/* <MaterialIcons name="search" size={20} color="#888" /> */}
              </TouchableOpacity>
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
    height: 100,
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
  dateText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#2D3436',
  },
});

export default EventForm;
