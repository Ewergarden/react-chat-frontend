import React from 'react';
import './Dialogs.scss'
import classNames from 'classnames'
import { Input, Empty } from 'antd';
import {DialogItem} from "../index";

import {orderBy} from "lodash";
const { Search } = Input;

const Dialogs = ({items,showMenu, userId, onSearch, inputValue,setCurrentDialog,user}) => {
    return (
        <div className="dialogs">
            <div className="chat__sidebar-search">
                <Search placeholder="Поиск среди контактов"  style={{ width: 280,backgroundColor:"#2A2A2A",border:"none",color:"#fff" }} onChange={e => onSearch(e.target.value)} value={inputValue} />
            </div>
            {items.length ? orderBy(items,['created_at'],['desc']).map(item => (

                <DialogItem
                    key={item._id}
                    _id={item._id}
                    partner={item.partner}
                    message={item}
                    unreaded={0}
                    showMenu={showMenu}
                    date={item.date}
                    user={user}
                    avatar={item.avatar}
                    author={item.author}
                    isMe={user && user._id ===  item.author._id }
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