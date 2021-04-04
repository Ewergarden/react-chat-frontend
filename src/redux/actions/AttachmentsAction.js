import DialogsAPI from "../../utils/api/DialogsAPI";


const  AttahmentsAction = {
    setAttachments: items =>({
        type: "ATTACHMENTS:SET",
        payload: items
    }),
    removeAttachments: (file) =>({
        type: "ATTACHMENTS:DELETE",
        payload: file
    })
}

export  default  AttahmentsAction;