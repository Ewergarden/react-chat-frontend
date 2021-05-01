import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import Dialogs from "../components/Dialogs/Dialogs";
import actions from "../redux/actions/DialogsAction";

import socket from "./../core/socket";

const DialogsContainer = ({items,showMenu, fetchDialogs, setCurrentDialog,userReducer}) => {

    const onNewDialog = () => {
        fetchDialogs();
    }
    
    const [inputValue, setValue] = useState('');
    const [filtred, setFiltredItems] = useState(Array.from(items));
    const onChangeInput = (value = '') => {
        setFiltredItems(items.filter(dialog => dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
            dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0

        ));

        setValue(value)
    }

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFiltredItems(items)
        }
        socket.on("SERVER:DIALOG_CREATED", onNewDialog);
        socket.on("SERVER:NEW_MESSAGE", onNewDialog);

        return () => {
            socket.removeListener("SERVER:DIALOG_CREATED", onNewDialog);
            socket.removeListener("SERVER:NEW_MESSAGE", onNewDialog);
        }
    }, [])

    useEffect( () => {
        if(items.length) {
            onChangeInput()
        }
    },[items])



    return <Dialogs showMenu={showMenu} user={userReducer} items={filtred} onSearch={onChangeInput} inputValue={inputValue} setCurrentDialog={setCurrentDialog}/>
}

export default connect(
    ({dialogReduser,userReducer}) => ({userReducer:userReducer.data,items:dialogReduser.items,fetchDialogs:dialogReduser.fetchDialogs,setCurrentDialog:dialogReduser.setCurrentDialog})

    , actions)(DialogsContainer);