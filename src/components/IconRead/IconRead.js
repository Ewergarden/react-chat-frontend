import сheckedIco from "../../assets/svg-editor-image (1).svg";
import React from "react";

const IconRead = ({isReaded}) => {
        return (
            isReaded &&
                <div className={'message__chek'}>
                    <img src={сheckedIco}/>
                </div>
          )
}

export default IconRead;