import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useAuth} from '../context/AuthContext';
import Box from '../ui/components/Box';
import Text from '../ui/components/Text';
import TextInput from '../ui/components/TextInput';
import Button from '../ui/components/Button';

const LoginScreen = () => {
  const {login} = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
    <Box padding="l">
      <Text variant="header" marginBottom="xl">
        Welcome Back!
      </Text>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button label="Login" onPress={handleLogin} />
    </Box>
  );
};

export default LoginScreen;
