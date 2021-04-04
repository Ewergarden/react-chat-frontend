import axios from 'axios';

axios.defaults.baseURL = "https://react-chat-serv.herokuapp.com/";
axios.defaults.headers.common["token"] = window.localStorage.token

window.axios = axios;

export default axios;