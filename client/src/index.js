import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot key={'recoil-root'}>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
