import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import middleware from './middleware';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';


const store = createStore(rootReducer, middleware);
const connectedApp = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  connectedApp,
  document.getElementById('root')
);
