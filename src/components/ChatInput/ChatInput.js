import React from 'react';
import PropTypes from "prop-types";
import  { Input,Button} from "antd";
import './ChatInput.scss'
import { UploadField } from '@navjobs/upload'

import {AudioOutlined, CameraOutlined, FrownOutlined, LoadingOutlined, SendOutlined} from '@ant-design/icons'

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
                    <Button onClick={props.toggleEmojiPicker} type="link"   icon={<FrownOutlined />} />
                </div>
                <Input onChange={e => props.setValue(e.target.value)}
                       value={props.value}
                       onKeyUp={SendMessage}
                       size='large' placeholder="Введите сообщение"  style={{ width: '100%' }} />
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
                                <Button type="link" size='large'  icon={<CameraOutlined />} onClick />
                            </div>

                        </UploadField>
                    </div>
                    {isLoading ? <LoadingOutlined /> :
                    isRecording || props.value || attachments.length  ? <div>
                        <button onClick={onStopRecording}>Стоп машина</button>
                        <Button  onClick={handleSendMessage}  icon={<SendOutlined />} />
                    </div> :<div>
                        <Button onClick={handleStartRecording} type="link"  icon={<AudioOutlined />} />
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