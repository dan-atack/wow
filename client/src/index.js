import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil'

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
