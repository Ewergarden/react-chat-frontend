import React from 'react';
import {Form, Input} from "antd";
import {Link} from "react-router-dom";
import {WhiteBlock} from "../../../components";
import Button from "../../../components/Button/Button";
import {validateField} from "utils/helpers";
import FormField from "../../../components/FormField/FormField";


// const validate = (key, touched, errors) => {
//     if (touched[key]) {
//         if (errors[key]) {
//             return 'error';
//         } else {
//             return 'success';
//         }
//     } else {
//         return '';
//     }
// }
//

const LoginForm = (props) => {


    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 30},
    };
    const tailLayout = {
        wrapperCol: {offset: 0, span: 30},
    };

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        history,
        isAuth
    } = props;
    return (
        <div>
            <div className={"auth__top"}>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <WhiteBlock>
                <Form
                    {...layout}
                    name="LoginForm"
                    onSubmit={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        hasFeedback
                        validateStatus={validateField('email', touched, errors)}


                    >
                        <Input size={"large"} placeholder="Введите логин" onChange={handleChange} onBlur={handleBlur}
                               id='email' value={values.name}/>
                    </Form.Item>


                    <Form.Item
                        name="password"
                        validateStatus={validateField('password', touched, errors)}


                    >
                        <Input.Password size={"large"} placeholder="Введите пароль" onChange={handleChange}
                                        onBlur={handleBlur} id='password' value={values.password}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button className={"large__button"} type="primary" htmlType="submit" onClick={handleSubmit} disabled={isSubmitting}>
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Link to={'/register'} className={'auth__link-registered'}>Зарегистрироваться</Link>
                </Form>
            </WhiteBlock>
        </div>
    );
}

export default LoginForm;