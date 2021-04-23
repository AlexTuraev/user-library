import React from 'react';

import './book-list-item.scss';

const BookListItem = ({title, language, subtitle, selected, keyId}) => {
    let classNames = 'book-item';
    if(selected) {
        classNames += ' book-item--selected';
    }

    return (
    <div className={classNames} data-key-id={keyId}>
        {title} ({language})<br></br>
        <span className='book-item__subtitle' data-key-id={keyId}>{subtitle}</span>
    </div>
    );
}

export default BookListItem;