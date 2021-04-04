import React,{useEffect}  from 'react';
import {FormOutlined, TeamOutlined, UnorderedListOutlined} from '@ant-design/icons'
import './../../styles/_chat.scss';
import './Home.scss'

import DialogsContainer from "../../containers/DialogContainers";
import MessageContainer from "../../containers/MessageContainer";
import ChatInputContainer from "../../containers/ChatInputContainer";
import {Button} from "antd";
import SideBar from "../../components/SideBar/SideBar";
import SideBarContainers from "../../containers/SideBarContainers";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import actions from "../../redux/actions/DialogsAction";



const Home = (props) => {
    const {setCurrentDialog} = props;
    useEffect(() => {
        const {location: {pathname}} = props;
        const dialogId = pathname.split('/').pop()
        setCurrentDialog(dialogId)
    }, [props.location.pathname])


    return (
        <section className={'home'}>
            <div className="chat">
                <SideBarContainers/>
                <div className="chat__dialogs">
                    <div className="chat__dialog-header">
                        <div></div>
                        <div className="chat__dialog-header-center">
                            <b className="chat__dialog-header-username">Гай Юлий Цезарь</b>
                            <div className="chat__dialog-header-status">
                                <div className="status status--online">онлайн</div>
                            </div>
                        </div>
                        <UnorderedListOutlined style={{fontSize: '22px'}} />
                    </div>
                        <MessageContainer />
                    <ChatInputContainer />
                </div>
            </div>
        </section>
    );
};

export default withRouter(connect(
    ({dialogReduser}) => dialogReduser, actions)(Home));