import React, {useState} from 'react';

import './user-book-list.scss';

const UserBookList = ({userBooks=[], removeBook, markReadBook, symbolMarkedKey}) =>{
    const handlerToggleMark = (key, isRead) =>{
        markReadBook(key, userBooks, isRead);
    }

    const handlerRemove = (key) => {
        removeBook(key, userBooks);
    }

            /* Делегирование click от кнопок */
    const handlerClickBtnGroup = (event) =>{

        switch(event.target.dataset.action){
            case 'MARK':
                handlerToggleMark(event.target.dataset.key, true);
                break;
            case 'UNMARK':
                handlerToggleMark(event.target.dataset.key, false);
                break;
            case 'REMOVE':
                handlerRemove(event.target.dataset.key);
                break;
        }

    }

    /*
        Вспомогательный компонент вывода группы кнопок
    */
    const BtnGroup = ({keyId}) =>{
        return(
            <div className='user-list__group-actions'>
                <div className='ui-link user-list__link not-read'
                    data-key={keyId} data-action='MARK'>
                    Mark as read
                </div>

                <div className='ui-link user-list__link read'
                    data-key={keyId} data-action='UNMARK'>
                    Mark as not read
                </div>

                <div className='ui-link user-list__link not-read'
                    data-key={keyId} data-action='REMOVE'>
                    Remove from list
                </div>
            </div>
        );
    }

    return(
        <div className='user-list'>
            <ul onClick={(e) => handlerClickBtnGroup(e)}>
                {
                    userBooks.map(book => {

                        let classNames = 'user-list__book';
                        if(book[symbolMarkedKey]) classNames = classNames + ' marked-yes';

                        const {title, language=[], subtitle, author_name} = book;
                        return(    
                            <li key={`${book.key}`} className='user-list__li'>
                                <div className={classNames}>
                                    <article className='user-list__book-data'>
                                        {title && <p className='user-list__title'>{title} ({language.join(', ')})</p>}
                                        {subtitle && <p className='user-list__subtitle'>{subtitle}</p>}
                                        {author_name && <p className='user-list__author'>{author_name}</p>}
                                        
                                        <BtnGroup keyId={book.key} />
                                    </article>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default UserBookList;