import React from 'react';
import './DialogItem.scss'
import {formatDistanceToNow, parseISO} from 'date-fns'
import rulocale from 'date-fns/locale/ru'
import classNames from 'classnames'
import IconRead from "../IconRead/IconRead";
import {format} from 'date-fns'
import {isToday} from 'date-fns'
import {Link} from "react-router-dom";


const getAvatar = avatar => {
    if (avatar) {
        return <img src={avatar} alt={'user avatar'}/>
    } else {
        return <img src={"https://im0-tub-ua.yandex.net/i?id=dce7865b6a1246be224f5dcc0968f813&n=13"} alt={'user avatar'}/>
    }
}

// <span>{formatDistanceToNow(date, {
//     addSuffix: true,
//     locale: rulocale})}</span>

const getMessageTime = created_at => {
    if (isToday(created_at)) {
        return format(created_at, 'HH:mm'
        )
    } else {
        return format(created_at, 'MM.dd.yyyy')
    }
}


const DialogItem = ({_id,partner,userId, isMe,avatar,onSelect,lastMessage}) => {
    debugger
    return (
        <Link to={`/dialog/${_id}`} onClick={onSelect.bind(this, _id)}  >
        <div  className={classNames("dialogs__item", 'active', {"dialogs__item--online": partner.isOnline})}>
            <div className="dialogs__item-avatar">
                {getAvatar(partner.avatar || avatar )}
            </div>
            <div className={'dialogs__item-info'}>
                <div className="dialogs__item-info-top">

                    <b>{partner.fullname}</b>
                    <span>
                        {getMessageTime(parseISO(lastMessage.createdAt))}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>{isMe=true ? `Вы: ${lastMessage.text}`: lastMessage.text} </p>
                    {isMe && <IconRead isMe={true} isReaded={false}/> }
                    {lastMessage.unreaded > 0 && <div className="dialogs__item-info-bottom-count">
                        {lastMessage.unreaded}
                    </div>}
                </div>
            </div>
        </div>
        </Link>
    );
};

export default DialogItem;
