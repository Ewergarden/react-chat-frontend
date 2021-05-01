import React,{useEffect,useState}  from 'react';
import {CloseOutlined, FormOutlined, MenuOutlined, TeamOutlined, UnorderedListOutlined} from '@ant-design/icons'
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
import userReducer from "../../redux/redusers/userReducer";



const Home = (props) => {
    debugger
    const [menuActive,setMenuActive] = useState(false);
    const {setCurrentDialog} = props;
    useEffect(() => {
        const {location: {pathname}} = props;
        const dialogId = pathname.split('/').pop()
        setCurrentDialog(dialogId)
    }, [props.location.pathname])

    let user = props.dialogReduser.items.map( dialog => (dialog.author ,dialog.partner))
    return (
        <section className={'home'}>
            <div className="chat">
                <SideBarContainers showMenu={() => setMenuActive(false)} menuActive={menuActive} />
                <div className="chat__dialogs">
                    <div className="chat__dialog-header">
                        <div>
                            <i className="chat__dialog_ico" onClick={() => setMenuActive(!menuActive)}>{menuActive ? <CloseOutlined /> :<MenuOutlined/>}</i>
                        </div>
                        <div className="chat__dialog-header-center">
                            {/*<b className="chat__dialog-header-username">{props.userReducer.data._id === user.author._id ? user.partner.fullname : user.author.fullname}</b>*/}
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
    ({dialogReduser,userReducer}) => ({userReducer: userReducer.data,dialogReduser:dialogReduser}), actions)(Home));