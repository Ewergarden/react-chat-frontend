import React from 'react';
import {Form, Input} from "antd";
import {validateField} from "utils/helpers";


const FormField = ({size,name,placeholder,touched,errors,values,handleChange,handleBlur}) => {
    return (
        <Form.Item
            name={name}
            hasFeedback
            validateStatus={validateField(name, touched, errors)}
            help={errors[name]}


        >
            <Input size={size} style={{backgroundColor:"#2A2A2A",border:"none",color:"#fff"}} placeholder={placeholder} onChange={handleChange} onBlur={handleBlur}
                   id={name} value={values[name]}/>
        </Form.Item>
    );
};

export default FormField;