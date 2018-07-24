import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRedux from './AppRedux';
import promise from 'redux-promise'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

const storeWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={storeWithMiddleware(reducers)}> 
    <AppRedux />
    </Provider>, document.getElementById('root'));
