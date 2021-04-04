import React from 'react';
import "./Auth.scss";
import {Route, Switch} from "react-router-dom";
import LoginContainer from "../../moduls/LoginForm/containers/LoginContainer";
import RegisterContainer from "../../moduls/RegisterForm";
import Success from "../Success/Success";








const Auth = (props) => {
        return (
            <section className={'auth'}>
                <div className={'auth__content'}>
                    <Switch>
                    <Route path='/login' render={() => <LoginContainer props={props}/>}/>
                    <Route path='/register' render={() => <RegisterContainer props={props} />}/>
                    <Route path='/success' render={() => <Success props={props} />}/>
                    </Switch>
                </div>
            </section>
        )
    }
export default Auth;