import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text, useTheme} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import Logo from '../components/common/Logo';

const ForgotPasswordScreen = ({navigation}: any) => {
  const {forgotPassword, verifyOtp, resetPassword, isInForgotPasswordFlow} =
    useAuth();
  const [step, setStep] = useState<'phone' | 'otp' | 'reset'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {colors} = useTheme();

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('Please enter your phone number.');
      return;
    }
    const success = await forgotPassword(phone.trim());
    if (success) {
      Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
      setStep('otp');
    } else {
      Alert.alert('Failed', 'Failed to send OTP. Please try again.');
    }
  };

  const handleOtp = async () => {
    if (!otp) {
      Alert.alert('Please enter the OTP.');
      return;
    }
    const success = await verifyOtp(parseInt(otp));
    if (success) {
      setStep('reset');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Please enter and confirm your new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }
    const success = await resetPassword(phone.trim(), newPassword);
    if (success) {
      Alert.alert('Success', 'Password reset successfully. Please login.');
      navigation?.replace('Login');
    } else {
      Alert.alert('Failed', 'Failed to reset password. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'phone':
        return (
          <>
            <TextInput
              mode="outlined"
              label="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              left={<TextInput.Icon icon="phone" />}
            />
            <Button
              mode="contained"
              onPress={handleSendOtp}
              loading={isInForgotPasswordFlow}
              disabled={isInForgotPasswordFlow}
              style={styles.button}>
              Send OTP
            </Button>
          </>
        );
      case 'otp':
        return (
          <>
            <Text style={styles.otpInfo}>
              OTP has been sent to your phone{' '}
              <Text style={{fontWeight: 'bold'}}>{phone}</Text>
            </Text>
            <TextInput
              mode="outlined"
              label="OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              left={<TextInput.Icon icon="message-processing" />}
            />
            <Button
              mode="contained"
              onPress={handleOtp}
              loading={isInForgotPasswordFlow}
              disabled={isInForgotPasswordFlow}
              style={styles.button}>
              Verify OTP
            </Button>
          </>
        );
      case 'reset':
        return (
          <>
            <TextInput
              mode="outlined"
              label="New Password"
              secureTextEntry={!isPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
            />
            <TextInput
              mode="outlined"
              label="Confirm Password"
              secureTextEntry={!isPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock-check" />}
            />
            <Button
              mode="contained"
              onPress={handleReset}
              loading={isInForgotPasswordFlow}
              disabled={isInForgotPasswordFlow}
              style={styles.button}>
              Reset Password
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.logoSection}>
        <Logo size="large" />
      </View>
      <Text variant="headlineLarge" style={styles.title}>
        Forgot Password
      </Text>
      {renderStepContent()}
      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation?.replace('Login')}>
        <Text style={[styles.link, {color: colors.primary}]}>
          Back to Login
        </Text>
      </TouchableOpacity>
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
  otpInfo: {
    textAlign: 'center',
    marginBottom: 16,
  },
  linkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
