import React, {useState} from 'react';
import {FormOutlined, TeamOutlined} from "@ant-design/icons";
import {Button, Input, Modal, Option} from "antd";
import DialogsContainer from "../../containers/DialogContainers";
import './sideBar.scss'
import { Select, Spin } from 'antd';

const SideBar = ({showMenu,messageText,menuActive,onChangeTextArea,onAddDialog,isLoading,onShow,onClose,visible, users,onChangeInput,onSearch,inputValue,onSelect}) => {

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

        <div className={ menuActive ? "chat__sidebar active" : "chat__sidebar"}>
            <div className="chat__sidebar-header">
                <div className={"chat__sidebar-header-ico"} >
                    <TeamOutlined className={'icon'} />
                    <span>Список Диалогов</span>
                </div>
                <i><FormOutlined onClick={onShow} /></i>
            </div>
            <Modal className="chat__sidebar-modal"  title="Создать диалог"  visible={visible}
                footer={[
                    <Button key='back' onClick={onClose} >
                        Закрыть
                    </Button>,
                    <Button disabled={!messageText} key='submit' type='primary' loading={isLoading} onClick={onAddDialog} >
                        Создать
                    </Button>
            ]}> <div className="chat__sidebar-modal-wrapper" >
                <Select
                    className="chat__sidebar-modal-select"
                    showSearch
                    value={inputValue}
                    placeholder="Введите имя пользователя"
                    onChange={onChangeInput}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    onSelect={onSelect}
                >
                    {options}
                </Select>
            </div>
                <div className="chat__sidebar-modal-wrapper" >
                <TextArea   className="chat__sidebar-modal-area" value={messageText} onChange={onChangeTextArea} rows={4} />
                </div>
            </Modal>

            <div className="chat__sidebar-dialogs">
                <DialogsContainer showMenu={showMenu} userId={users.id} />
            </div>
        </div>
    );
};

export default SideBar;