export  default   ({isAuth}) =>( {
    email: (errors, values) => {
        if (!values) {
            errors.email = 'Эмаил указан не корректно';
        }

    },
    name: (errors, values) => {
        if (!values) {
            errors.name = 'Пожалуйста впишите Имя';
        }
    },
    password: (errors, values) => {
        if (!values) {
            errors.password = isAuth ? "Не верный пароль" : 'Введите пароль';
        }
    }
})

