import React from 'react';
import PropTypes from "prop-types";
import  { Input,Button} from "antd";
import './ChatInput.scss'
import { UploadField } from '@navjobs/upload'

import {
    AudioMutedOutlined,
    AudioOutlined,
    CameraOutlined,
    FrownOutlined, GitlabOutlined,
    LoadingOutlined,
    SendOutlined
} from '@ant-design/icons'

import { Picker } from 'emoji-mart'
import UploadFiles from "../UploadFile/UploadFiles";
import socket from "../../core/socket";

const ChatInput = (props) => {
    const {isLoading,removeAttachments,userReducer,setisLoading,mediaRecorder,fetchSendMessage,currentDialog,attachments,onSelectFiles,handleStartRecording,isRecording,onStopRecording} = props



    const handleSendMessage = () => {
        if(isRecording) {
            onStopRecording()

        } else if (props.value || attachments) {
            fetchSendMessage({text: props.value,_id:currentDialog,attachments:attachments.map(file => file.uid  )})
        }

        props.setValue("")
        props.setAttachments([])

    }


    const setEmoji = ({colons}) => {
        props.setValue(props.value + " " + colons)
    }
    const SendMessage = (e) => {
        socket.emit("DIALOGS:TYPING", {currentDialog,userReducer})
        if (e.keyCode === 13) {
            handleSendMessage()
        }
    }


    return (
        <div className="chat__dialog-input">
            <div className="chat__dialog-input-area">
                <div className="chat-input__smile-btn">
                    {props.emojiPickerVisible && <div className="chat-input__emoji-picker">
                        <Picker onSelect={(emojiTag) =>setEmoji(emojiTag)} set='apple' />
                    </div>}
                    <i  onClick={props.toggleEmojiPicker} type="link"><GitlabOutlined /></i>
                </div>
                <Input  onChange={e => props.setValue(e.target.value)}
                       value={props.value}
                       onKeyUp={SendMessage}
                       size='large' placeholder="Введите сообщение"  style={{ width: '100%',backgroundColor:"#2A2A2A",color:"#fff"}} />
                <div className="chat-input__actions">
                    <div>
                        <UploadField
                            onFiles={onSelectFiles}
                            containerProps={{
                                className: 'photos'
                            }}
                            uploadProps={{
                                accept: '.pdf,.doc,.docx,.txt,.rtf',
                            }}
                        >
                            <div>
                                <i  type="link" size='large' onClick><CameraOutlined /></i>
                            </div>

                        </UploadField>
                    </div>
                    {isLoading ? <LoadingOutlined /> :
                    isRecording || props.value || attachments.length  ? <div>
                        <i  onClick={handleSendMessage} type="link"><SendOutlined /></i>
                    </div> :<div>
                        <i  onClick={handleStartRecording} type="link"><AudioOutlined /></i>
                    </div>
                    }
                </div>
            </div>
            {attachments.length > 0 && <div className={'chat-input__attachments'}>
                <UploadFiles  removeAttachments={removeAttachments} attachments={attachments}/>
                </div>}

        </div>

        )

};

ChatInput.propTypes = {
    className: PropTypes.string
}


export default ChatInput;