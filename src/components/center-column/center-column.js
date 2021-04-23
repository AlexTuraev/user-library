import React from 'react';
import {connect} from 'react-redux';

import './center-column.scss';
import {addToReadBook} from '../../store/actions';

const CenterColumn = ({book={}, userBooks={}, addToReadBook}) =>{
    const {title, subtitle, language, has_fulltext, first_publish_year, publish_year, key} = book;

    const handlerAddBook = () =>{
        addToReadBook(book, userBooks);
    }

    return (
        <div className='selected-book'>
            {(key === undefined) ? <p>Selected book's information</p> :
            (
                <>
                    {title && <p>{title}</p>}
                    {subtitle && <p className='selected-book__subtitle'>{subtitle}</p>}<br />
                    {Array.isArray(language) && <p>Language available: {language.join(', ')}</p>}
                    <p>Full text available: {has_fulltext ? 'true' : 'false'}</p>
                    {first_publish_year && <p>First publish year: {first_publish_year}</p>}
                    {Array.isArray(publish_year) && <p>Years published: {publish_year.join(', ')}</p>}<br/>
                    
                    <div className='ui-link selected-book__add-book'
                        onClick={handlerAddBook}>
                        Add book to Read List
                    </div>
                </>
                
            )
            }
        </div>
    );
}

const mapStateToProps = ({selectedBook: {book}, toReadBooks : {userBooks}}) =>{
    return{
        book,
        userBooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addToReadBook: (newBook, userBooks) => dispatch(addToReadBook (newBook, userBooks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterColumn);