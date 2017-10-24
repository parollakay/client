import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import reducers from './reducers';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
ReactGA.initialize('UA-107289651-2');
ReactPixel.init('124418598230525');

function fireTracking() {
  ReactGA.pageview(window.location.href);
  ReactPixel.pageView();
}

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router onUpdate={fireTracking}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
