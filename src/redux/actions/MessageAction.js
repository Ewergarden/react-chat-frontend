import MessageAPI from "../../utils/api/MessageAPI";


const actions = {
    fetchMessage: (dialogId) => dispatch => {
        dispatch(actions.setIsLoading(true))
        MessageAPI.getAllByDialogId(dialogId).then(({data}) => {
                dispatch(actions.setMessage(data));
            }
        ).catch(() => {
                dispatch(actions.setIsLoading(false))
            }
        )
    },
    removeMessage: id => dispatch => {
        MessageAPI.removeMessage(id).then(({data}) => {
            dispatch({
                type: "MESSAGES:REMOVE_MESSAGE",
                payload: id
            });

        }
        ).catch(() => {
                dispatch(actions.setIsLoading(false))
            }
        )
    },
    fetchSendMessage: ({text, _id,attachments}) => dispatch => {
        debugger
        MessageAPI.send(text, _id,attachments)
    },
    setMessage: items => ({
        type: "MESSAGES : SET_ITEMS",
        payload: items
    }),
    addMessage: message => (dispatch, getState) =>{
        console.log(getState())
        const {dialogReduser} = getState();
        const {currentDialog} = dialogReduser;
        debugger
        if(currentDialog === message.dialog._id ){
            dispatch({
                type: "MESSAGES : ADD_MESSAGE",
                payload: message
            })
        }
    },
    setIsLoading: bool => ({
        type: "MESSAGES : SET_IS_LOADING",
        payload: bool
    }),
}

export default actions;