import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/index'
import { Provider } from "react-redux";
import { initiateChannel } from './utils/initiateChannel'

const render = () => {
  return (
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    )
  )
}


let user = localStorage.getItem('user');

if (user !== "" && user !== undefined) {
  user = JSON.parse(user);
  if(user && user.token){
    store.dispatch({type:'SET_LOGIN',payload:user})
    //initiateChannel();
    render()
  } else {
    render()
  }
} else {
  render()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
