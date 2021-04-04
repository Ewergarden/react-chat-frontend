import React from 'react';
import {Auth} from 'pages';
import {Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import {connect} from "react-redux";
import {Redirect} from "react-router";



const App = (props) => {
  return (
      <Switch>
        <div className="wrapper">
            <Switch>
            <Route exact path={['/register','/login','/success']} component={Auth}/>
            <Route path='/' render={() => (props.isAuth ? <Home /> : <Redirect to='/login' />)}/>
            </Switch>
        </div>
      </Switch>
  );
}

export default  connect(({userReducer}) => ({isAuth: userReducer.isAuth}))(App);

