import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Button, SegmentedButtons, useTheme} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Logo from '../components/common/Logo';
import {normalizeObjectStrings} from '../utils';

const RegisterScreen = ({navigation}: any) => {
  const {register, registerLoading} = useAuth();
  const theme = useTheme();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'Male' as 'Male' | 'Female',
    password: '',
  });

  const handleRegister = async () => {
    const {name, phone, password} = form;
    if (!name || !phone || !password) {
      Alert.alert(
        'Missing Fields',
        'Name, phone, email, and password are required.',
      );
      return;
    }

    // Basic email validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(form.email)) {
    //   Alert.alert('Invalid Email', 'Please enter a valid email address.');
    //   return;
    // }

    // Basic phone validation (10-13 digits)
    if (form.phone.length < 10 || form.phone.length > 13) {
      Alert.alert(
        'Invalid Phone',
        'Please enter a valid phone number (10-13 digits).',
      );
      return;
    }
    const success = await register(normalizeObjectStrings(form));
    if (success) {
      Alert.alert(
        'Registration Successful',
        'You have successfully registered. Please log in to continue.',
        [{text: 'OK', onPress: () => navigation?.replace('Login')}],
      );
    } else {
      Alert.alert(
        'Registration Failed',
        'Please try again or check if the phone number is already registered.',
      );
    }
  };

  return (
    // <LoadingSpinner loading={registerLoading} text="Registering...">
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={[styles.container, {backgroundColor: theme.colors.background}]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.logoSection}>
          <Logo size="large" />
        </View>

        <Text style={[styles.title, {color: theme.colors.onBackground}]}>
          Register
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.onSurface,
              borderColor: theme.colors.outline,
            },
          ]}
          placeholder="Full Name"
          value={form.name}
          onChangeText={name => setForm(prev => ({...prev, name}))}
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.onSurface,
              borderColor: theme.colors.outline,
            },
          ]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={phone => setForm(prev => ({...prev, phone}))}
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.onSurface,
              borderColor: theme.colors.outline,
            },
          ]}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={email => setForm(prev => ({...prev, email}))}
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <View style={styles.genderContainer}>
          <SegmentedButtons
            value={form.gender}
            onValueChange={gender =>
              setForm(prev => ({
                ...prev,
                gender: gender as 'Male' | 'Female',
              }))
            }
            buttons={[
              {
                icon: 'male',
                value: 'Male',
                label: 'Male',
                style: styles.segmentedButton,
                labelStyle: styles.segmentedLabel,
              },
              {
                icon: 'female',
                value: 'Female',
                label: 'Female',
                style: styles.segmentedButton,
                labelStyle: styles.segmentedLabel,
              },
            ]}
            style={styles.segmentedButtons}
            density="small"
          />
        </View>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.onSurface,
              borderColor: theme.colors.outline,
            },
          ]}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={password => setForm(prev => ({...prev, password}))}
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <Button
          loading={registerLoading}
          mode="contained"
          style={{borderRadius: 12}}
          contentStyle={styles.button}
          onPress={handleRegister}
          disabled={registerLoading}>
          Register
        </Button>
        <TouchableOpacity onPress={() => navigation?.replace('Login')}>
          <Text style={[styles.link, {color: theme.colors.primary}]}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    // </LoadingSpinner>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  genderContainer: {
    marginBottom: 16,
  },
  segmentedButtons: {
    borderRadius: 12,
  },
  segmentedButton: {
    borderRadius: 12,
  },
  segmentedLabel: {
    paddingVertical: 8,
  },
  button: {
    height: 56,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
