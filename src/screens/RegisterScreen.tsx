import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  SegmentedButtons,
  useTheme,
} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import {normalizeObjectStrings} from '../utils';
import Logo from '../components/common/Logo';

const RegisterScreen = ({navigation}: any) => {
  const {register, registerLoading} = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {colors} = useTheme();
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
      Alert.alert('Name, phone, and password are required.');
      return;
    }
    if (form.phone.length < 10 || form.phone.length > 13) {
      Alert.alert('Please enter a valid phone number (10-13 digits).');
      return;
    }
    const success = await register(normalizeObjectStrings(form));
    if (success) {
      Alert.alert(
        'Registration Successful',
        'Please log in to continue.',
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
    <>
      <View style={styles.logoSection}>
        <Logo size="large" />
      </View>
      <Text variant="headlineLarge" style={styles.title}>
        Create an Account
      </Text>
      <TextInput
        mode="outlined"
        label="Full Name"
        value={form.name}
        onChangeText={name => setForm(prev => ({...prev, name}))}
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="Phone Number"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={phone => setForm(prev => ({...prev, phone}))}
        style={styles.input}
        left={<TextInput.Icon icon="phone" />}
      />
      <TextInput
        mode="outlined"
        label="Email (Optional)"
        keyboardType="email-address"
        value={form.email}
        onChangeText={email => setForm(prev => ({...prev, email}))}
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />
      <View style={styles.genderContainer}>
        <SegmentedButtons
          value={form.gender}
          onValueChange={gender =>
            setForm(prev => ({...prev, gender: gender as 'Male' | 'Female'}))
          }
          buttons={[
            {
              value: 'Male',
              label: 'Male',
              icon: 'gender-male',
            },
            {
              value: 'Female',
              label: 'Female',
              icon: 'gender-female',
            },
          ]}
        />
      </View>
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={!isPasswordVisible}
        value={form.password}
        onChangeText={password => setForm(prev => ({...prev, password}))}
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye-off' : 'eye'}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        }
      />
      <Button
        mode="contained"
        onPress={handleRegister}
        loading={registerLoading}
        disabled={registerLoading}
        style={styles.button}>
        Register
      </Button>
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation?.replace('Login')}>
        <Text style={[styles.link, {color: colors.primary}]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  genderContainer: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
