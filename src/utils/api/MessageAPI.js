import axios from "./../../core/axios"





export default {
    getAllByDialogId: id => axios.get('/messages?dialog=' + id),
    removeMessage: id => axios.delete('/messages?id=' + id),
    send: (text, _id,attachments) => axios.post('/messages', {
        "text" : text,
        "_id" : _id,
        attachments
    }),
}