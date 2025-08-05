import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {
  Button,
  useTheme,
  TextInput,
  Surface,
  Divider,
  HelperText,
  ActivityIndicator,
} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Logo from '../components/common/Logo';

const {width} = Dimensions.get('window');

const LoginScreen = ({navigation}: any) => {
  const {login, loading} = useAuth();
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const formScaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Staggered entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(formScaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim, formScaleAnim]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.trim().length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    } else if (!/^\d+$/.test(phone.trim())) {
      newErrors.phone = 'Phone number must contain only digits';
    } else if (phone.trim().length > 15) {
      newErrors.phone = 'Phone number is too long';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length > 50) {
      newErrors.password = 'Password is too long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      // Shake animation for validation errors
      Animated.sequence([
        Animated.timing(formScaleAnim, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(formScaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(phone.trim(), password);
      if (!success) {
        Alert.alert(
          'Login Failed',
          'Invalid phone number or password. Please check your credentials and try again.',
          [{text: 'OK', style: 'default'}],
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.', [
        {text: 'OK', style: 'default'},
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (text: string) => {
    // Only allow digits and limit length
    const cleanedText = text.replace(/[^0-9]/g, '').slice(0, 15);
    setPhone(cleanedText);
    if (errors.phone) {
      setErrors(prev => ({...prev, phone: ''}));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({...prev, password: ''}));
    }
  };

  const isFormValid = phone.trim().length >= 10 && password.length >= 6;

  const getInputTheme = () => ({
    colors: {
      ...theme.colors,
      primary: theme.colors.primary,
      error: theme.colors.error,
      onSurface: theme.colors.onSurface,
      onSurfaceVariant: theme.colors.onSurfaceVariant,
    },
  });

  return (
    <LoadingSpinner loading={loading} text="Signing you in...">
      <KeyboardAvoidingView
        style={[styles.container, {backgroundColor: theme.colors.background}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {/* Header Section */}
          <Animated.View
            style={[
              styles.headerSection,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}, {scale: scaleAnim}],
              },
            ]}>
            <Logo size="large" />
            <Text
              style={[styles.welcomeText, {color: theme.colors.onBackground}]}>
              Welcome Back
            </Text>
            <Text
              style={[
                styles.subtitleText,
                {color: theme.colors.onSurfaceVariant},
              ]}>
              Sign in to your account to continue
            </Text>
          </Animated.View>

          {/* Login Form */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                transform: [{scale: formScaleAnim}],
              },
            ]}>
            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Phone Number"
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                left={<TextInput.Icon icon="smartphone" />}
                error={!!errors.phone}
                style={styles.textInput}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                theme={getInputTheme()}
                maxLength={15}
                returnKeyType="next"
                blurOnSubmit={false}
              />
              {errors.phone && (
                <HelperText type="error" visible={!!errors.phone}>
                  {errors.phone}
                </HelperText>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'visibility-off' : 'visibility'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                error={!!errors.password}
                style={styles.textInput}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                theme={getInputTheme()}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              {errors.password && (
                <HelperText type="error" visible={!!errors.password}>
                  {errors.password}
                </HelperText>
              )}
            </View>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={[styles.loginButton]}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              icon={isSubmitting ? undefined : 'login'}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={() => navigation?.replace('ForgotPassword')}
              style={styles.forgotPasswordLink}
              disabled={isSubmitting}>
              <Text
                style={[
                  styles.linkText,
                  {
                    color: isSubmitting
                      ? theme.colors.onSurfaceVariant
                      : theme.colors.primary,
                  },
                ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            {/* Register Section */}
            <View style={styles.registerSection}>
              <Text
                style={[
                  styles.registerText,
                  {color: theme.colors.onSurfaceVariant},
                ]}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation?.replace('Register')}
                disabled={isSubmitting}>
                <Text
                  style={[
                    styles.registerLink,
                    {
                      color: isSubmitting
                        ? theme.colors.onSurfaceVariant
                        : theme.colors.primary,
                    },
                  ]}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text
              style={[
                styles.footerText,
                {color: theme.colors.onSurfaceVariant},
              ]}>
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LoadingSpinner>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
    paddingTop: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.7,
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  inputContent: {
    paddingVertical: 8,
  },
  inputOutline: {
    borderRadius: 12,
    borderWidth: 1.5,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonContent: {
    height: 52,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  forgotPasswordLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  registerSurface: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
  },
  registerText: {
    fontSize: 14,
    marginRight: 8,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    opacity: 0.6,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});

export default LoginScreen;
