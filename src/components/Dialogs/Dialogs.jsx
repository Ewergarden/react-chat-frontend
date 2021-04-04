import React from 'react';
import './Dialogs.scss'
import classNames from 'classnames'
import { Input, Empty } from 'antd';
import {DialogItem} from "../index";

import {orderBy} from "lodash";
const { Search } = Input;

const Dialogs = ({items, userId, onSearch, inputValue,setCurrentDialog}) => {
    debugger
    return (
        <div className="dialogs">
            <div className="chat__sidebar-search">
                <Search placeholder="Поиск среди контактов"  style={{ width: 280 }} onChange={e => onSearch(e.target.value)} value={inputValue} />
            </div>
            {items.length ? orderBy(items,['created_at'],['desc']).map(item => (

                <DialogItem
                    key={item._id}
                    _id={item._id}
                    user={item.user}
                    partner={item.partner}
                    message={item}
                    unreaded={0}
                    date={item.date}
                    userId={userId}
                    avatar={item.avatar}
                    isMe={item.lastMessage.user.id === item.author.id }
                    onSelect={setCurrentDialog}
                    onSearch = {onSearch}
                    lastMessage={item.lastMessage}
                />
                )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Нет контактов' />
            }
        </div>
    );
};

export default Dialogs;