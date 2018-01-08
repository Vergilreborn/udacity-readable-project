import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers'


const store = createStore(
  reducer,
  compose(applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension())
);

ReactDOM.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();

