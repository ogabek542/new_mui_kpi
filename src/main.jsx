import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material'
import theme from './styles/theme/index.js'
import { Provider } from 'react-redux';
import {store} from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
            <App /> 
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
