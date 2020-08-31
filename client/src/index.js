import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
