import { notification } from 'antd';



export default  ({text,type='info',title}) => notification.open({
    message: title,
    description: text
});