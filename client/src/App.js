import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import NavBar from './components/UI/NavBar';
import '../../node_modules/toastr/build/toastr.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './static/css/style.css';

import centerReducer from './store/reducers/centerReducer';
import userReducer from './store/reducers/userReducer';
import eventReducer from './store/reducers/eventReducer';
import authReducer from './store/reducers/authReducer';
import { setUser } from './store/actions/userAction';


require('bootstrap');

axios.defaults.baseURL = 'http://localhost:8000/api/v1';
// const baseUrl = 'https://eventappmanager.herokuapp.com/api/v1';
// axios.defaults.baseURL = baseUrl;

const tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = tool;
const rootReducer = combineReducers({
  centers: centerReducer,
  users: userReducer,
  events: eventReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
store.dispatch(setUser(jwt.decode(localStorage.jwtToken)));


const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
    </BrowserRouter>
  </Provider>
);


export default App;
