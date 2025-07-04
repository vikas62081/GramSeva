import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {saveToStorage, getFromStorage} from '../utils/AsyncStorage';

interface User {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  register: (data: User & {password: string}) => Promise<boolean>;
  forgotPassword: (phone: string) => Promise<boolean>;
  resetPassword: (
    phone: string,
    otp: string,
    newPassword: string,
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedUser = await getFromStorage('user');
      if (storedUser) setUser(storedUser);
      setLoading(false);
    })();
  }, []);

  const login = async (phone: string, password: string) => {
    setLoading(true);
    // Simulate login logic (replace with real API)
    const registered = (await getFromStorage('registeredUsers')) || [];
    const found = registered.find(
      (u: any) => u.phone === phone && u.password === password,
    );
    if (found) {
      setUser(found);
      await saveToStorage('user', found);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const googleLogin = async () => {
    // Simulate Google login (replace with real Google Sign-In)
    const googleUser = {
      name: 'Google User',
      phone: '0000000000',
      email: 'user@gmail.com',
      gender: 'Other',
    };
    setUser(googleUser);
    await saveToStorage('user', googleUser);
    return true;
  };

  const logout = async () => {
    setUser(null);
    await saveToStorage('user', null);
  };

  const register = async (data: User & {password: string}) => {
    setLoading(true);
    let registered = (await getFromStorage('registeredUsers')) || [];
    if (registered.find((u: any) => u.phone === data.phone)) {
      setLoading(false);
      return false; // Already registered
    }
    registered.push(data);
    await saveToStorage('registeredUsers', registered);
    setUser(data);
    await saveToStorage('user', data);
    setLoading(false);
    return true;
  };

  const forgotPassword = async (phone: string) => {
    // Simulate sending OTP (always 9999)
    const registered = (await getFromStorage('registeredUsers')) || [];
    return true;
    return !!registered.find((u: any) => u.phone === phone);
  };

  const resetPassword = async (
    phone: string,
    otp: string,
    newPassword: string,
  ) => {
    if (otp !== '9999') return false;
    let registered = (await getFromStorage('registeredUsers')) || [];
    const idx = registered.findIndex((u: any) => u.phone === phone);
    if (idx === -1) return false;
    registered[idx].password = newPassword;
    await saveToStorage('registeredUsers', registered);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        googleLogin,
        logout,
        register,
        forgotPassword,
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
