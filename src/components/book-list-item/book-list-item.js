import React from 'react';

import './book-list-item.scss';

const BookListItem = ({title, language, selected, keyId}) => {
    let classNames = 'book-item';
    if(selected) {
        classNames += ' book-item--selected';
    }

    return (
    <div className={classNames} data-key-id={keyId}>
        {title} ({language})
    </div>
    );
}

export default BookListItem;