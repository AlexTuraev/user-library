import React from 'react';

import './right-column-header.scss';

const RightColumnHeader = ({countBooks, countMarkedBooks}) =>{
    return(
        <header className='to-read-header'>
            <div className='to-read-header__block'>
                <h2>To read list...</h2>
                <span className='to-read-header__info'>{countBooks} books,</span>
                <span className='to-read-header__info'>{countMarkedBooks} read</span>
            </div>
        </header>
    );
}

export default RightColumnHeader;