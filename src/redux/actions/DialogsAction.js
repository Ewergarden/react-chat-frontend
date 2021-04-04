import DialogsAPI from "../../utils/api/DialogsAPI";

import socket from "../../core/socket";


const  actions = {
    setDialogs: items =>({
        type: "DIALOGS : SET_ITEMS",
        payload: items
    }),
    setCurrentDialog: id => dispatch => {
        socket.emit("DIALOGS:JOIN", id)
        dispatch({
            type: "DIALOG:SET_CURRENT_DIALOG",
            payload: id
        })
    },
    fetchDialogs: () => dispatch => {
        DialogsAPI.getAll().then(({data}) => {
                dispatch(actions.setDialogs(data));
            }

        )
    }
}

export  default  actions;