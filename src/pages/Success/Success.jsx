import React, {useEffect,useState} from 'react';
import {Result} from 'antd';
import UserAPI from "../../utils/api/UserAPI";
import Button from "../../components/Button/Button";


const Success = ({props}) => {
    debugger
    const [verified,setVerified] = useState(false)

    useEffect(() => {
        const hash = props.location.search.split('hash=')[1];
        if (hash) {
            UserAPI.verifyHash(hash).then( ({data}) => {
            if(data.status === 'success'){
                setVerified(true)
            }
            })
            }
        })


    return (
        <Result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle={!verified ? (<p>Успех</p>) : (<p>Успешный Успех</p>) }
            extra={<Button onClick={()=>props.history.push('/login')}>Войти</Button>}
        />
    )
}

export default Success;