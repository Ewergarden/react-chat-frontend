import React, {useState,useEffect} from 'react';
import ChatInput from "../components/ChatInput/ChatInput";
import {connect} from "react-redux";
import MessageAction from "../redux/actions/MessageAction";
import AttahmentsAction from '../redux/actions/AttachmentsAction'
import UploadAPI from "../utils/api/UploadAPI";
window.navigator.getUserMedia = (window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.onabort.msGetUserMedia ||
    window.navigator.webkitGetUserMedia
)

const ChatInputContainer = ({dialogReduser: {currentDialog},Attachments,fetchSendMessage,setAttachments,removeAttachments,userReducer}) => {
    const [value, setValue] = useState('');
    const [isRecording, setIsRecording] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPickerVisible, setshowEmojiPiccker] = useState(false);
    const [isLoading, setisLoading] = useState("");
    const toggleEmojiPicker = () => {
        setshowEmojiPiccker(!emojiPickerVisible);
    }

    const onStopRecording = () => {
        mediaRecorder.stop()
        setIsRecording(false)

    }
    const onRecord = () => {
        if(navigator.getUserMedia) {
            navigator.getUserMedia({audio:true},onRecording,onError)
        }

    }
    const onRecording =  stream =>  {
        const recorder = new MediaRecorder(stream)
        setMediaRecorder(recorder)
        recorder.start()

        recorder.onstart = () => {
            setIsRecording(true)
        }

        recorder.onstop = () => {
            setIsRecording(false)
        }

        recorder.ondataavailable = function (e) {
           const file = new File([e.data],"audio.ogg",{type:"audio/ogg"});
           setisLoading(true)
           UploadAPI.upload(file).then(({data})=> {
               sendAudio(data.file._id)
               setisLoading(false)
           })

        }
    }

    const sendAudio = (audioId) => {
        fetchSendMessage({text: null,_id:currentDialog,attachments:[audioId]})
    }

    const onError = (err) => {
        console.log(err)
    }


    if(!currentDialog) {
        return null
    }

    const  onSelectFiles = async files => {
        let uploaded = []
        for ( let i = 0; i <files.length; i++) {
            const file = files[i]
            const uid = Math.round(Math.random() * 1000)
            uploaded = [
                ...uploaded,
                {
                uid,
                name: file.name,
                status: 'uploading',
            }]
            setAttachments(uploaded)
            await UploadAPI.upload(file).then(({data}) => {
                uploaded = uploaded.map(item => {
                    if(item.uid === uid) {
                        return  {
                            uid: data.file._id,
                            name: data.file.filename,
                            status: "done",
                            url: data.file.url
                        }
                    }
                    return item;
                })
            })
        }
        setAttachments(uploaded)
    };


    return (
            <ChatInput
                setisLoading={setisLoading}
                isLoading={isLoading}
                mediaRecorder={mediaRecorder}
                isRecording={isRecording}
                onStopRecording={onStopRecording}
                handleStartRecording={onRecord}
                setAttachments={setAttachments}
                onSelectFiles={onSelectFiles}
                attachments={Attachments}
                toggleEmojiPicker={toggleEmojiPicker}
                setValue={setValue}
                userReducer={userReducer}
                removeAttachments={removeAttachments}
                emojiPickerVisible={emojiPickerVisible}
                setshowEmojiPiccker={setshowEmojiPiccker}
                value={value} fetchSendMessage={fetchSendMessage} currentDialog={currentDialog}/>

    );
};

export default connect(({dialogReduser,Attachments,userReducer}) => ({dialogReduser,Attachments:Attachments.items,userReducer: userReducer.data}), {...MessageAction, ...AttahmentsAction})( ChatInputContainer);