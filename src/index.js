import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
