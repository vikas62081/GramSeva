import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {saveToStorage, getFromStorage} from '../utils/AsyncStorage';
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  LoginRequest,
  RegisterRequest,
  OtpVerificationRequest,
  ResetPasswordRequest,
} from '../store/slices/authApiSlice';
import {useGetUserQuery, userApi} from '../store/slices/userApiSlice';
import {useDispatch} from 'react-redux';
interface CreateUser {
  name: string;
  phone: string;
  email: string;
  gender: string;
}
interface User extends CreateUser {
  id: string;
  role: string;
  status: string;
  family_id?: string | null;
  created_at: string;
  updated_at: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  registerLoading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterRequest) => Promise<boolean>;
  forgotPassword: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: number) => Promise<boolean>;
  resetPassword: (phone: string, newPassword: string) => Promise<boolean>;
  isInForgotPasswordFlow: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // RTK Query hooks
  const {
    data: freshUserData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(userId!, {
    skip: !userId,
  });
  const [loginMutation, {isLoading: loginLoading}] = useLoginMutation();
  const [registerMutation, {isLoading: registerLoading}] =
    useRegisterMutation();
  const [forgotPasswordMutation, {isLoading: isSendingOtp}] =
    useForgotPasswordMutation();
  const [verifyOtpMutation, {isLoading: isVerifyingOtp}] =
    useVerifyOtpMutation();
  const [resetPasswordMutation, {isLoading: isResetingPassword}] =
    useResetPasswordMutation();
  const [otpRequestId, setOtpRequestId] = useState('');

  // Load user from storage on app start
  useEffect(() => {
    (async () => {
      try {
        const storedUser = await getFromStorage('user');
        if (storedUser && storedUser.id) {
          setUser(storedUser);
          setUserId(storedUser.id);
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (userError) {
      logout();
    } else if (freshUserData) {
      const updatedUser = {
        ...freshUserData,
        token: user?.token || '',
      };
      setUser(updatedUser);
      saveToStorage('user', updatedUser);
    }
  }, [freshUserData, userError]);

  const login = async (phone: string, password: string) => {
    try {
      const loginData: LoginRequest = {
        username: phone,
        password: password,
      };
      const _user = await loginMutation(loginData).unwrap();
      if (_user) {
        setUser(_user);
        setUserId(_user.id);
        await saveToStorage('user', _user);
        if (_user.token) {
          await saveToStorage('token', _user.token);
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const registerData: RegisterRequest = {
        name: data.name,
        email: data.email || '',
        phone: data.phone,
        password: data.password,
        gender: (data.gender as 'Male' | 'Female') || 'Male',
      };
      const response = await registerMutation(registerData).unwrap();
      if (response) return true;
      return false;
    } catch (error) {
      return false;
    }
  };

  const forgotPassword = async (phone: string) => {
    try {
      const response = await forgotPasswordMutation({phone}).unwrap();
      setOtpRequestId(response.data?.message || '');
      return response.data ? true : false;
    } catch (error) {
      return false;
    }
  };

  const verifyOtp = async (otp: number) => {
    try {
      const otpData: OtpVerificationRequest = {
        optRequestId: otpRequestId,
        otp: otp,
      };

      const response = await verifyOtpMutation(otpData).unwrap();
      return response.data ? true : false;
    } catch (error) {
      return false;
    }
  };

  const resetPassword = async (phone: string, newPassword: string) => {
    try {
      const resetData: ResetPasswordRequest = {
        phone: phone,
        new_password: newPassword,
      };

      const response = await resetPasswordMutation(resetData).unwrap();
      return response.data ? true : false;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };

  const logout = async () => {
    dispatch(userApi.util.resetApiState());
    await saveToStorage('user', null);
    await saveToStorage('token', null);
    setUser(null);
    setUserId(null);
  };

  const isLoading = loginLoading || loading || userLoading;
  const isInForgotPasswordFlow =
    isSendingOtp || isVerifyingOtp || isResetingPassword;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        registerLoading,
        login,
        logout,
        register,
        forgotPassword,
        verifyOtp,
        resetPassword,
        isInForgotPasswordFlow,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
