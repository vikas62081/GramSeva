import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import Logo from '../components/common/Logo';

const LoginScreen = ({navigation}: any) => {
  const {login, loading} = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Please enter both phone number and password.');
      return;
    }
    const success = await login(phone.trim(), password);
    if (!success) {
      Alert.alert('Invalid phone number or password. Please try again.');
    }
  };

  return (
    <>
      <View style={styles.logoSection}>
        <Logo size="large" />
      </View>
      <Text variant="headlineLarge" style={styles.title}>
        Welcome Back!
      </Text>
      <TextInput
        mode="outlined"
        label="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        left={<TextInput.Icon icon="phone" />}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={!isPasswordVisible}
        value={password}
        onChangeText={setPassword}
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
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}>
        Login
      </Button>
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation?.replace('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation?.replace('ForgotPassword')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 48,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
