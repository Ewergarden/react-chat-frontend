import React, {useEffect, useRef, useState} from 'react';

import {connect} from "react-redux";
import MessageItem from "../components/MessageItem/MessageItem";
import actions from "../redux/actions/MessageAction";
import socket from "../core/socket";
import {Empty} from "antd";







const MessageContainer = ({Attachments, currentDialog,fetchMessage,addMessage,removeMessage, items,isLoading,userReducer}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [LayoutHeight, setLayoutHeight] = useState(135);
    const [isTyping, setIsTyping] = useState(false);
    let typingTimeout = null;
    const messagesRef = useRef(null);
    const onNewMessage = data => {
        addMessage(data)
    }
    const toggleIsTyping = () => {
        setIsTyping(true)
        clearInterval(typingTimeout)
        typingTimeout = setTimeout(() => {
            setIsTyping(false)
        }, 3000)
    }
    useEffect(() => {
        socket.on("DIALOGS:TYPING", toggleIsTyping)
    },[])


    useEffect(() => {
        if(Attachments.length > 0 ) {
            setLayoutHeight(277)
        } else {
            setLayoutHeight(135)
        }
    },[Attachments])


    useEffect(() => {
            if (currentDialog) {
                fetchMessage(currentDialog)
            }
            socket.on("SERVER:NEW_MESSAGE", onNewMessage)

            return() => {
                socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage)
            }
        },[currentDialog]
    )


    useEffect(() => {
        if(!currentDialog ) {
            return <Empty description='Нет сообщений'/>;
        }
            messagesRef.current.scrollTo(0, 999999)
    },[items])



    return currentDialog ?  <MessageItem isTyping={isTyping} LayoutHeight={LayoutHeight} previewImage={previewImage}  setPreviewImage={setPreviewImage} user={userReducer} blockref={messagesRef} onRemoveMessage={removeMessage} items={items} isLoading={isLoading && !userReducer}/> : <Empty description='Нет сообщений'/>
}

export default connect(
    ({dialogReduser,MessageReducer,userReducer,Attachments}) => ({currentDialog:dialogReduser.currentDialog,items: MessageReducer.items,isLoading: MessageReducer.isLoading,userReducer:userReducer.data,Attachments: Attachments.items}),actions)(MessageContainer);