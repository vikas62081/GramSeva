import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {AuthProvider} from './src/context/AuthContext';
import {RBACProvider} from './src/context/RBACContext';
import Container from './src/ui/components/Container';
import AppNavigator from './src/navigation/AppNavigator';
import {StatusBar} from 'react-native';

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RBACProvider>
          <Container>
            <StatusBar barStyle="dark-content" />
            <AppNavigator />
          </Container>
        </RBACProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
