import React, {useState, useRef, useEffect} from 'react';
import reactStringReplace from "react-string-replace"
import './Messag.scss';
import  formatDistanceToNow from 'date-fns/formatDistanceToNow/index.js'
import { parseISO } from 'date-fns'

import classNames from 'classnames'
import IconRead from "../IconRead/IconRead";
import  { Popover,Button} from 'antd';
import wave from 'assets/wawe.svg';
import play from 'assets/play.svg';
import pause from 'assets/pause.svg';
import {convertCurrentTime} from "../../utils/helpers";
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons'
import {Emoji} from "emoji-mart";
const ru = require('date-fns/locale/ru')

export const AudioMessage = ({item,isMe}) => {




    let audioElem = item ;

    const [isPlaying, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    audioElem = useRef(null);

    useEffect(() => {
            audioElem.current.addEventListener('playing', () => {
                setPlaying(true);
            }, false);
            audioElem.current.addEventListener('ended', () => {
                convertCurrentTime(0)
                setProgress(0);
                setPlaying(false);
            }, false);
            audioElem.current.addEventListener('pause', () => {
                setPlaying(false);
            }, false);
            audioElem.current.addEventListener('timeupdate', () => {
                const duration = audioElem.current && audioElem.current.duration || 0;
                setCurrentTime(audioElem.current.currentTime)
                setProgress((audioElem.current.currentTime / duration) * 100);
            }, false);

        },
        [
        ])

    const togglePlay =  () => {
        if(!isPlaying) {
            audioElem.current.play()
        } else {
            audioElem.current.pause()
        }
    }
    return (
        <div className={classNames("message__audio", {"message__audio-me" : isMe})}>
            <div className={classNames("message__buble",{"message__buble-me": isMe})} >
            <audio src={item.url} ref={audioElem}  preload={'auto'}/>
            <div className="message__audio-progress" style={{width: progress + '%' }}>
            </div>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={togglePlay}>
                        {isPlaying ? <img src={pause} alt={'pause'}/> : <img src={play} alt={'play'}/> }
                    </button>
                </div>
                <div className="message__audio-wawe">
                    <img src={wave} alt={'Wawe svg'}/>
                </div>
                <span className="message__audio-duration">
                                            {convertCurrentTime(currentTime)}
                                        </span>
            </div>
            </div>

        </div>
    )
}

const getAvatar = avatar => {
    if (avatar) {
        return <img src={avatar} alt={'user avatar'}/>
    } else {
        return <img src={"https://im0-tub-ua.yandex.net/i?id=dce7865b6a1246be224f5dcc0968f813&n=13"} alt={'user avatar'}/>
    }
}






export const Message = ({setPreviewImage,user,createdAt,text,isTyping,isMe,attachments,avatar,onRemoveMessage }) => {
    const renderAttachment = (item) => {
        if(item.ext !== "webm") {
            return (<div  className="message__attachments-item">
                <i className="message__attachments-item-prev"><EyeOutlined onClick={() => {setPreviewImage(item.url)}} /></i>
                <img src={item.url}/>
            </div>)} else {
                return  <AudioMessage item={item} isMe={isMe} />
        }
    }




    const content = (
        <div >
            <button  className="message__button" onClick={onRemoveMessage}>Удалить</button>
        </div>
    );

    const isAudio = () => {
            const file = attachments[0];
            return attachments.length && file.ext === 'webm'
    }


    return (
        <div className={classNames('message', {'message__isMe': isMe , 'message__is-typing' : isTyping, 'message__image-one' : !isAudio() && attachments && attachments.length === 1 && !text, "message__is-audio" : isAudio() })}>

            <div className={ classNames( 'message__avatar',{'message__avatar__isMe': isMe})}>
                {getAvatar(user.avatar)}
            </div>
            <div className={"message__wrapper:"}>

                <div className={classNames('message__content', {'message__isMe-content': isMe})}>
                    {(text || isTyping) && (
                        <div className={classNames('message__buble', {'message__buble-me': isMe})}>
                            {text && <p className={"message__text"}>{reactStringReplace(text,/:(.+?):/g,(match,i)=> (
                                <Emoji emoji={match} set='apple' size={16} />
                            ))}</p>}


                        </div>)}
                    {attachments &&(
                        <div className="message__attachments">
                            {attachments.map(item => renderAttachment(item))}
                        </div>)}
                    {isMe ? <Popover className='trash__pover' style={{background:"#000"}}  placement="top"  content={content} trigger="click">
                        <i  className='trash__button'><DeleteOutlined style={{color:"#fff"}} /></i>
                </Popover> : <></>}
                </div>

                {createdAt && <span className={'message__date'}>{formatDistanceToNow(parseISO(createdAt),{addSuffix: true,locale: ru})}</span>}
            </div>
            {/*<IconRead  isReaded={props.isReaded}/>*/}
        </div>
    );
};

export default Message;