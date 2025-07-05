import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginScreen = ({navigation}: any) => {
  const {login, googleLogin, loading} = useAuth();
  // @ts-ignore
  const theme = require('styled-components').useTheme();
  const colors = theme.colors;
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert(
        'Missing Fields',
        'Please enter both phone number and password.',
      );
      return;
    }

    const success = await login(phone, password);
    if (!success) {
      Alert.alert(
        'Login Failed',
        'Invalid phone number or password. Please try again.',
      );
    }
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
  };

  return (
    <LoadingSpinner loading={loading} content="Logging in...">
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={[styles.title, {color: colors.text}]}>Login</Text>
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
          value={phone}
          onChangeText={setPhone}
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
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.primary}]}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={[styles.buttonText, {color: '#fff'}]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.googleButton,
            {backgroundColor: colors.background, borderColor: colors.primary},
          ]}
          onPress={handleGoogleLogin}
          disabled={loading}>
          <Text style={[styles.googleButtonText, {color: colors.primary}]}>
            Login with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
          <Text style={[styles.link, {color: colors.subtext}]}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation?.navigate('ForgotPassword')}>
          <Text style={[styles.link, {color: colors.subtext}]}>
            Forgot Password?
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
  googleButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
