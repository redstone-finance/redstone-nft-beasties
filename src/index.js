import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './views/App/App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/dangrek/400.css';
const colors = {
  brand: {
    lighter: '#f0f6f6',
    light: '#bbe6e4',
    regular: '#42bfdd',
    darker: '#ff66b3',
    dark: '#084b83',
  },
};

export const customTheme = extendTheme({
  colors,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'Dangrek',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
