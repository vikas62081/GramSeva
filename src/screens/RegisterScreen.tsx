import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Pills from '../components/common/Pills';
import {genderOptions} from '../components/family/constants';
import {useAuth} from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RegisterScreen = ({navigation}: any) => {
  const {register, loading} = useAuth();
  // @ts-ignore
  const theme = require('styled-components').useTheme();
  const colors = theme.colors;
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'Male',
    password: '',
  });

  const handleRegister = async () => {
    if (!form.name || !form.phone || !form.password) {
      Alert.alert('Missing Fields', 'Name, phone, and password are required.');
      return;
    }
    const success = await register(form);
    if (!success) {
      Alert.alert('Registration Failed', 'Phone number already registered.');
    }
  };

  return (
    <LoadingSpinner loading={loading} content="Registering...">
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={[styles.title, {color: colors.text}]}>Register</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Full Name"
          value={form.name}
          onChangeText={name => setForm(prev => ({...prev, name}))}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={phone => setForm(prev => ({...prev, phone}))}
          placeholderTextColor={colors.placeholder}
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Email (optional)"
          keyboardType="email-address"
          value={form.email}
          onChangeText={email => setForm(prev => ({...prev, email}))}
          placeholderTextColor={colors.placeholder}
        />
        <View style={{marginBottom: 16}}>
          <Pills
            options={genderOptions}
            selectedOption={form.gender}
            onSelect={gender => setForm(prev => ({...prev, gender}))}
          />
        </View>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={password => setForm(prev => ({...prev, password}))}
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.success}]}
          onPress={handleRegister}
          disabled={loading}>
          <Text style={[styles.buttonText, {color: '#fff'}]}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
          <Text style={[styles.link, {color: colors.subtext}]}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </LoadingSpinner>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
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
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
