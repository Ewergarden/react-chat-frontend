import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {Spin,Empty} from 'antd';
import Message from "../Message/Message";
import { LoadingOutlined } from '@ant-design/icons';
import classNames from "classnames";
import "./MessageItems.scss"
import {Modal} from "antd"




const MessageItem = ({isTyping,setPreviewImage,previewImage,blockref,LayoutHeight,isLoading,items, user,onRemoveMessage}) => {
    const antIcon = <LoadingOutlined style={{ color:"#fff", fontSize: '80px' }} spin />
    return ( <div ref={blockref} className="chat__dialog-message" style={{"height": `calc(100% - ${LayoutHeight}px )`}}><div className={classNames( {'message__loading' : isLoading })}>
            {

                isLoading ? (<Spin size="large"  style={{color:"#fff"}} indicator={antIcon} tip="Загрузка сообщений"/>) : items !=0 && !isLoading ? (
                items.map(item => <Message isTyping={isTyping} setPreviewImage={setPreviewImage} {...item} onRemoveMessage={ onRemoveMessage.bind(this, item._id)} isMe={user && user._id === item.user._id}/>)) : (<Empty description='Нет сообщений'/>)
            }
        <Modal className="preview" style={{maxWidth: "450px"}} footer={null} visible={!!previewImage}  onCancel={() => {
            setPreviewImage(null)
        }}>
            <img src={previewImage} className="preview__image" alt="Preview image"/>
        </Modal>

    </div></div>)

}


MessageItem.propTypes = {
    items: PropTypes.array
}
export default MessageItem;