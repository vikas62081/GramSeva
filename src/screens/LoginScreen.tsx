import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Logo from '../components/common/Logo';

const LoginScreen = ({navigation}: any) => {
  const {login, loading} = useAuth();
  const theme = useTheme();
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

    const success = await login(phone.trim(), password);
    if (!success) {
      Alert.alert(
        'Login Failed',
        'Invalid phone number or password. Please try again.',
      );
    }
  };

  return (
    <LoadingSpinner loading={loading} text="Logging in...">
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.logoSection}>
          <Logo size="large" />
        </View>

        <Text style={[styles.title, {color: theme.colors.onBackground}]}>
          Login
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
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
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
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme.colors.onSurfaceVariant}
        />
        <Button
          loading={loading}
          mode="contained"
          style={{borderRadius: 12}}
          contentStyle={styles.button}
          onPress={handleLogin}
          disabled={loading}>
          Login
        </Button>

        <TouchableOpacity onPress={() => navigation?.replace('Register')}>
          <Text style={[styles.link, {color: theme.colors.primary}]}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.replace('ForgotPassword')}>
          <Text style={[styles.link, {color: theme.colors.primary}]}>
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
    // justifyContent: 'center',
    padding: 24,
    paddingTop: 72,
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
  button: {
    height: 56,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
