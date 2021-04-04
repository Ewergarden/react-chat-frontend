
import {withFormik} from "formik";
import RegisterForm from "../components/RegisterForm";
import validateFunc from "../../../utils/validator";
import store from "../../../redux/store";
import {UsserAction as UserAction} from "../../../redux/actions/UsserAction";



const RegisterContainer =  withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: '',
        password: '',
        fullname: ''
    }),
    // Custom sync validation
    // validate: values => {
    //     let errors = {};
    //     const validator = validateFunc({ isAuth: false});
    //     const keys = Object.keys(values);
    //     keys.forEach(key =>validator[key] && validator[key](errors,values[key]));
    //     return errors;
    // },


    handleSubmit: (values, { setSubmitting,props}) => {
        store.dispatch(UserAction.fetchUserRegister(values)).then(({status}) =>{
            if (status === 'success') {
                setTimeout(() =>{
                    props.props.history.push('/')
                }, 50)
            }

        })
    },

    displayName: 'RegisterForm',
})(RegisterForm);

export default  RegisterContainer