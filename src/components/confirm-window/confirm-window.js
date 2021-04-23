import React, {useState} from 'react';

import './confirm-window.scss';

const ConfirmWindow = ({getAnswer = arg=>arg}) =>{
    const [classNames, setClassNames] = useState('confirm-window');
    
    const handlerClick = (answer) =>{
        getAnswer(answer);
        setClassNames(classNames + ' confirm-window--closed');
    }

    return (
        <div className={classNames}>
            <span onClick={()=>handlerClick('OK')} className='ui-link'>OK</span>
            <span onClick={()=>handlerClick('CANCEL')} className='ui-link'>CANCEL</span>
        </div>
    );
}

export default ConfirmWindow;