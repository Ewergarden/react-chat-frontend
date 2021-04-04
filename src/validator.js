 const validator = {
    email: (errors, values) => {
        if (!values) {
            errors.email = 'Эмаил указан не корректно';
        }
    }
}

export default validator;