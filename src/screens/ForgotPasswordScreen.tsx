import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Logo from '../components/common/Logo';

const ForgotPasswordScreen = ({navigation}: any) => {
  const {forgotPassword, verifyOtp, resetPassword, isInForgotPasswordFlow} =
    useAuth();
  const theme = useTheme();
  const [step, setStep] = useState<'phone' | 'otp' | 'reset'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('Missing Field', 'Please enter your phone number.');
      return;
    }
    Keyboard.dismiss();
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
      Alert.alert('Missing Field', 'Please enter the OTP.');
      return;
    }
    Keyboard.dismiss();
    const success = await verifyOtp(parseInt(otp));
    if (success) {
      setStep('reset');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert(
        'Missing Fields',
        'Please enter and confirm your new password.',
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    Keyboard.dismiss();
    const success = await resetPassword(phone.trim(), newPassword);
    if (success) {
      Alert.alert('Success', 'Password reset successfully. Please login.');
      navigation?.navigate('Login');
    } else {
      Alert.alert('Failed', 'Failed to reset password. Please try again.');
    }
  };

  return (
    <LoadingSpinner
      loading={isInForgotPasswordFlow}
      text={
        step === 'phone'
          ? 'Sending OTP...'
          : step === 'otp'
          ? 'Verifying Otp...'
          : 'Reseting password...'
      }
      backgroundColor="rgba(0, 0, 0, 0.4)">
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.logoSection}>
          <Logo size="medium" />
        </View>

        <Text style={[styles.title, {color: theme.colors.onBackground}]}>
          Forgot Password
        </Text>
        {step === 'phone' && (
          <>
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
            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.colors.primary}]}
              onPress={handleSendOtp}
              disabled={isInForgotPasswordFlow}>
              <Text
                style={[styles.buttonText, {color: theme.colors.onPrimary}]}>
                Send OTP
              </Text>
            </TouchableOpacity>
          </>
        )}
        {step === 'otp' && (
          <>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.onSurface,
                  borderColor: theme.colors.outline,
                },
              ]}
              placeholder="OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.colors.primary}]}
              onPress={handleOtp}
              disabled={isInForgotPasswordFlow}>
              <Text
                style={[styles.buttonText, {color: theme.colors.onPrimary}]}>
                Verify OTP
              </Text>
            </TouchableOpacity>
          </>
        )}
        {step === 'reset' && (
          <>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.onSurface,
                  borderColor: theme.colors.outline,
                },
              ]}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
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
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.colors.primary}]}
              onPress={handleReset}
              disabled={isInForgotPasswordFlow}>
              <Text
                style={[styles.buttonText, {color: theme.colors.onPrimary}]}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
          <Text style={[styles.link, {color: theme.colors.primary}]}>
            Back to Login
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
    paddingTop: 120,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
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

export default ForgotPasswordScreen;
