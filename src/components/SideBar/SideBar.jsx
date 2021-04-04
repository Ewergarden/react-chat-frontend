import React, {useState} from 'react';
import {FormOutlined, TeamOutlined} from "@ant-design/icons";
import {Button, Input, Modal, Option} from "antd";
import DialogsContainer from "../../containers/DialogContainers";
import './sideBar.scss'
import { Select, Spin } from 'antd';

const SideBar = ({messageText,onChangeTextArea,onAddDialog,isLoading,onShow,onClose,visible, users,onChangeInput,onSearch,inputValue,onSelect}) => {

    const { Option } = Select;


    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }


    const options = users.map(user => <Option key={user.id}  >{user.fullname}</Option> )

    const { TextArea } = Input;

    return (

        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div className={"chat__sidebar-header-ico"} >
                    <TeamOutlined className={'icon'} />
                    <span>Список Диалогов</span>
                </div>
                <Button onClick={onShow}><FormOutlined /></Button>
            </div>
            <Modal centered title="Создать диалог" visible={visible}
                footer={[
                    <Button key='back' onClick={onClose} >
                        Закрыть
                    </Button>,
                    <Button disabled={!messageText} key='submit' type='primary' loading={isLoading} onClick={onAddDialog} >
                        Создать
                    </Button>
            ]}>
                <Select
                    showSearch
                    value={inputValue}
                    style={{ width: 470 }}
                    placeholder="Введите имя пользователя"
                    onChange={onChangeInput}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    onSelect={onSelect}
                >
                    {options}
                </Select>
                <br/>
                <TextArea  value={messageText} onChange={onChangeTextArea} rows={4} />
            </Modal>

            <div className="chat__sidebar-dialogs">
                <DialogsContainer userId={users.id} />
            </div>
        </div>
    );
};

export default SideBar;