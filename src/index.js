import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'state/reducers/reducer.js';
import authReducer from 'state/reducers/auth.js';
import freelancerReducer from 'state/reducers/freelancer.js';
import clientReducer from 'state/reducers/client';
import adminReducer from 'state/reducers/admin';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    admin: adminReducer,
    auth: authReducer,
    app: reducer,
    freelancer: freelancerReducer,
    client: clientReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development'? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

const store = createStore( 
    rootReducer,
    composeEnhancers( applyMiddleware(thunk) )
);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
