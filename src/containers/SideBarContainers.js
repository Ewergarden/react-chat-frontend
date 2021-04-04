import React, {useState} from 'react';
import SideBar from "../components/SideBar/SideBar"
import {connect} from "react-redux";
import UserAPI from "../utils/api/UserAPI";
import DialogsAPI from "../utils/api/DialogsAPI";

const SideBarContainers = () => {
    const [visible,setVisible] = useState(false);
    const [inputValue,setInputValue] = useState('');
    const [users,setUsers] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [selectedUser,setSelectedUser] = useState(false);
    const [messageText,setMessage] = useState(false);

    const handleChangeInput = (value) => {
        setInputValue(value)
    };
    const onSearch = (val) => {
        setIsLoading(true)
        UserAPI.findUsers(val).then(({data}) =>  {
            setUsers(data)
            setIsLoading(false)
        })
    }


    const onClose = () => {
        setVisible(false)
    }


    const onAddDialog = () => {
        DialogsAPI.create({
            _id: selectedUser,
            text:messageText
        }).then(({data}) =>  {
            onClose()
        })
    }
    const onChangeTextArea = e => {
        setMessage(e.target.value)
    }


    const onSelect= user => {
        setSelectedUser(user)
    }

    return (
        <SideBar messageText={messageText} onChangeTextArea={onChangeTextArea} onAddDialog={onAddDialog} onAddDialog={onAddDialog} isLoading={isLoading} users={users} onSearch={onSearch} onSelect={onSelect}  onChangeInput={handleChangeInput} inputValue={inputValue} visible={visible} onClose={onClose} onShow={() => {setVisible(true)}}/>
    );
};

export default connect(({userReducer}) => ({userReducer: userReducer.data})

)(SideBarContainers);