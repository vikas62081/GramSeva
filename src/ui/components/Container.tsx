import React from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme from '../theme';
import Box from './Box';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box flex={1} backgroundColor="mainBackground">
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Container;
