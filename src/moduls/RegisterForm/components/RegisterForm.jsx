import React from 'react';
import {Form} from "antd";
import {Link} from "react-router-dom";
import {WhiteBlock} from "../../../components";
import Button from "../../../components/Button/Button";
import {ExclamationCircleTwoTone} from '@ant-design/icons';
import {validateField} from "utils/helpers";
import FormField from "../../../components/FormField/FormField";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 30},
  };
const tailLayout = {
    wrapperCol: {offset: 0, span: 30},
};


const success = true;
const RegisterForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props;

    return (
        <div>
            <div className={"auth__top"}>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <WhiteBlock>
                {success ? <Form
                    {...layout}
                    name="RegisterForm"
                    onSubmit={handleSubmit}
                >
                    <FormField size='large' name='fullname' handleBlur={handleBlur} handleChange={handleChange} touched={touched} errors={errors}  values={values} placeholder='Введите ваше имя' />
                    <FormField size='large' name='email' handleBlur={handleBlur} handleChange={handleChange} touched={touched} errors={errors}  values={values} placeholder='Введите ваш эмеил' />
                    <FormField size='large' name='password' handleBlur={handleBlur} handleChange={handleChange} touched={touched} errors={errors}  values={values} placeholder='Введите ваш пароль' />



                    <Form.Item {...tailLayout}>
                        <Button className={"large__button"} type="primary" htmlType="submit" onClick={handleSubmit} disabled={isSubmitting}>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <Link to={'/login'} className={'auth__link-registered'}>Войти</Link>
                </Form> : <div className={"auth__sucess-block"}>
                    <ExclamationCircleTwoTone style={{fontSize: '50px', color: "hotpink"}}/>
                    <h2>Подтвердите свой аккаунт</h2>
                    <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта</p>
                </div>}
            </WhiteBlock>
        </div>
    );
}



export default RegisterForm;

