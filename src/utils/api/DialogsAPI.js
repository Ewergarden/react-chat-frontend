import axios from "./../../core/axios"





export default {
    getAll: ()=> axios.get('/dialogs'),
    create: ({_id,text}) => axios.post('/dialogs',{partner: _id,text})

}