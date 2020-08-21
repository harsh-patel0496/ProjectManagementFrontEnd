import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Routes from './routes';
import theme from "./theme";
import { ThemeProvider } from '@material-ui/styles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
