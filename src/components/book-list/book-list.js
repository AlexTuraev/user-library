import React from 'react';
import {connect} from 'react-redux';

import './book-list.scss';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {bookSelected} from '../../store/actions';

const BookList = ({items=[], loading, error, bookSelected, selectedKey}) =>{
    const handlerClick = (event) =>{
        const key = event.target.dataset.keyId; /* делегирование, берем параметр с dataset от div в BookListItem */
        //console.log(key);
        bookSelected(key, items);
    }

    const elements = items.map((item)=>{
        const key = item.key.split('/').pop();
        let selected = false;
        if (key===selectedKey) {
            selected = true;
        }
        return (
            //<li key={key} onClick={()=>handlerClick(key)}>
            <li key={key}>
                <BookListItem keyId={key} title={item.title} language={item.language} selected={selected}/>
            </li>
        );
    });

    const errorIndicator = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = (loading || error) ? null : <ul onClick={(event)=>handlerClick(event)}>{elements}</ul>;

    return (
        <div className='book-list'>
            {spinner}
            {content}
            {errorIndicator}
        </div>
    );
}

const mapStateToProps = ({bookList: {books:{docs : items}, loading, error},
    selectedBook: {selectedKey } }) => {
    return{
        items,
        loading,
        error,
        selectedKey
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        bookSelected: (key, book) => dispatch(bookSelected(key, book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);