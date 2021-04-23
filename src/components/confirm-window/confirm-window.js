import React, {useState} from 'react';

import './confirm-window.scss';

const ConfirmWindow = ({keyId, getAnswer = ()=>{}}) =>{
    const [classNames, setClassNames] = useState('confirm-window');
    
    const handlerClick = (answer) =>{
        getAnswer({keyId, answer});
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