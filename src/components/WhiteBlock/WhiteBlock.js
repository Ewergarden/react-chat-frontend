import React from 'react';
import './WhiteBlock.scss';
import classNames from 'classnames';

const WhiteBlock = ({children}) => {
    return (
        <div className={classNames('block')}>
            {children}
        </div>
    );
};


export default WhiteBlock;