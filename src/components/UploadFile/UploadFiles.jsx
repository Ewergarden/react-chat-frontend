import React, {useState,useEffect} from 'react';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const UploadFiles = ({attachments,removeAttachments}) => {
    const [state,setState] = useState({
        previewVisible:false,
        previewImage: '',
        fileList: attachments

    })

    useEffect(() => {
        setState({
            ...state,
            fileList:attachments
        })
    },[attachments])

    const handleCancel = () => setState({...state, previewVisible: false });

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setState({...state, previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
                }
            )

    };

    const handleChange = ({ fileList }) => setState({...state, fileList });


    return(
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={state.fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={file => removeAttachments(file)}
            >
            </Upload>
            {/*<Modal*/}
            {/*    visible={previewVisible}*/}
            {/*    title={previewTitle}*/}
            {/*    footer={null}*/}
            {/*    onCancel={handleCancel}*/}
            {/*>*/}
            {/*    <img alt="example" style={{ width: '100%' }} src={previewImage} />*/}
            {/*</Modal>*/}
        </>)
}

UploadFiles.defaultProps = {
    attachments: []
}

export default UploadFiles;


