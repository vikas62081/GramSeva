// context/SnackbarContext.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Snackbar, useTheme} from 'react-native-paper';

type SnackbarType = 'success' | 'error' | 'info';

interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    duration?: number,
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<SnackbarType>('success');
  const [duration, setDuration] = useState(13000);

  const {colors} = useTheme();

  const showSnackbar = (
    msg: string,
    type: SnackbarType = 'success',
    dur: number = 3000,
  ) => {
    setMessage(msg);
    setType(type);
    setDuration(dur);
    setVisible(true);
  };

  const onDismiss = () => setVisible(false);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#2e7d32'; // green
      case 'error':
        return '#d32f2f'; // red
      case 'info':
        return '#1976d2';
      default:
        return colors.backdrop; // or any neutral shade
    }
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        style={{backgroundColor: getBackgroundColor(), bottom: 50}}
        action={{
          label: 'OK',
          onPress: () => setVisible(false),
        }}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
