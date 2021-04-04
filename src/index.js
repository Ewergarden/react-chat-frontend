import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./styles/index.scss"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";



import 'emoji-mart/css/emoji-mart.css'
import {UsserAction} from "./redux/actions/UsserAction";
import store from "./redux/store";



store.dispatch(UsserAction.fetchUserData())


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
,
document.getElementById('root')
);

