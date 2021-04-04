
import {withFormik} from "formik";
import validateFunc from "../../../utils/validator";
import LoginForm from "../components/LoginForm";
import store from "../../../redux/store";
import {UsserAction} from "../../../redux/actions/UsserAction";
import React from "react";
import Home from "../../../pages/Home/Home";
import {Redirect} from "react-router-dom";





const LoginContainer =  withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    // Custom sync validation
    validate: values => {
        let errors = {};
        const validator = validateFunc({ isAuth: true});
        const keys = Object.keys(values);
        keys.forEach(key =>validator[key] && validator[key](errors,values[key]));
        return errors;
    },

    handleSubmit: (values, { setSubmitting,props}) => {
        store.dispatch(UsserAction.fetchUserLogin(values)).then(({status}) =>{
            if (status === 'success') {
                    props.props.history.push('/')
            }
            setSubmitting(false)
        })
    },

    displayName: 'LoginForm',
})(LoginForm);



export default LoginContainer;
