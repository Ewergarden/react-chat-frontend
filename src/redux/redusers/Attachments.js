const initialState = {
    items: []
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case"ATTACHMENTS:SET":
            return {
                ...state,
                items: payload
            };
            case"ATTACHMENTS:DELETE":
                return{
                    ...state,
                    items:state.items.filter(item =>item.uid !== payload.uid)
                }

        default:
            return state;
    }
}