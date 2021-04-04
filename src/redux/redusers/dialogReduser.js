


const initialState = {
    items: [],
    currentDialog: window.location.pathname.split('dialog/')[1],
    isLoading: false
}

export default (state = initialState, {type,payload}) => {
    switch (type){
        case"DIALOGS : SET_ITEMS":
            return {
                ...state,
                items: payload
            };
        case  "DIALOG:SET_CURRENT_DIALOG":
            return {
                ...state,
                currentDialog: payload
            }
        default:
            return state;
    }
}