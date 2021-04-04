import UserAPI from "../../utils/api/UserAPI";
import openNotification from "../../utils/helpers/openNotification";


export const UsserAction =  {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: bool => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        UserAPI.getMe().then(({data}) => {
            dispatch(UsserAction.setUserData(data))
        }).catch(err => {
            if(err.response.status === 403) {
                dispatch(UsserAction.setIsAuth(false))
                delete window.localStorage.token
            }
        })
    },

    fetchUserLogin: (postData) => dispatch => {
        return UserAPI.login(postData).then(({data})=> {
                const {status,token} = data;
                if(status === 'error'){
                    openNotification({
                        title: "Ошибка при авторизации",
                        text: "Неверный логин или пароль",
                        type: "error"
                    })
                } else {
                    openNotification({
                        text: "Авторизация прошла успешно",
                        type: "success"
                    })
                    window.axios.defaults.headers.common['token'] = token;
                    window.localStorage['token'] = token;
                        dispatch(UsserAction.fetchUserData())
                        dispatch(UsserAction.setIsAuth(true))
                }
                return data;


        })
    },
    fetchUserRegister: (postData) => dispatch => {
         return UserAPI.register(postData).then(({data})=> {
            const {status,token} = data;
            if(status === 'error'){
                openNotification({
                    title: "Ошибка при регистрации",
                    text: "Неверный логин или пароль",
                    type: "error"
                })
            } else {
                openNotification({
                    text: "Регистрация прошла успешно",
                    type: "success"
                })
            }
            return data;



         })
    }
}
