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
  login: (phone: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterRequest) => Promise<boolean>;
  forgotPassword: (phone: string) => Promise<boolean>;
  verifyOtp: (phone: string, otp: number) => Promise<boolean>;
  resetPassword: (
    phone: string,
    otp: number,
    newPassword: string,
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // RTK Query hooks
  const [loginMutation, {isLoading: loginLoading}] = useLoginMutation();
  const [registerMutation, {isLoading: registerLoading}] =
    useRegisterMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();

  useEffect(() => {
    (async () => {
      const storedUser = await getFromStorage('user');
      if (storedUser) setUser(storedUser);
      setLoading(false);
    })();
  }, []);

  const login = async (phone: string, password: string) => {
    try {
      const loginData: LoginRequest = {
        username: phone,
        password: password,
      };
      const _user = await loginMutation(loginData).unwrap();
      if (_user) {
        setUser(_user);
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

  const googleLogin = async () => {
    // Simulate Google login (replace with real Google Sign-In)
    // const googleUser = {
    //   name: 'Google User',
    //   phone: '0000000000',
    //   email: 'user@gmail.com',
    //   gender: 'Other',
    // };
    // setUser(googleUser);
    // await saveToStorage('user', googleUser);
    return true;
  };

  const logout = async () => {
    setUser(null);
    await saveToStorage('user', null);
    await saveToStorage('token', null);
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
      return response.data ? true : false;
    } catch (error) {
      return false;
    }
  };

  const verifyOtp = async (phone: string, otp: number) => {
    try {
      const otpData: OtpVerificationRequest = {
        phone: phone,
        otp: otp,
      };

      const response = await verifyOtpMutation(otpData).unwrap();
      return response.data ? true : false;
    } catch (error) {
      return false;
    }
  };

  const resetPassword = async (
    phone: string,
    otp: number,
    newPassword: string,
  ) => {
    try {
      const resetData: ResetPasswordRequest = {
        phone: phone,
        otp: otp,
        new_password: newPassword,
      };

      const response = await resetPasswordMutation(resetData).unwrap();
      return response.data ? true : false;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };

  const isLoading = loginLoading || registerLoading || loading;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login,
        googleLogin,
        logout,
        register,
        forgotPassword,
        verifyOtp,
        resetPassword,
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
