import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import {throttle} from 'lodash';

import './book-list.scss';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {bookSelected, fetchBooks, booksLoaded, booksError} from '../../store/actions';
import {BookServiceContext} from '../book-service-context/book-service-context';

const BookList = ({books={}, loading, error, bookSelected, selectedKey, fetchBooks, booksLoaded, booksError}) =>{
    const searchKey = Symbol.for('symbolSearchInfo');
    const {docs: items=[], numFound, start, [searchKey]: searchString=''} = books;
    const bookService = useContext(BookServiceContext);

    const [isScrolled, setIsScrolled] = useState(null);        /* когда нужен скролл, после добавления данных */
    const [prevScrollTop, setPrevScrollTop] = useState(null);     /* после доавления данных, на предыдущую позицию скрола */

    useEffect(()=>{
        if(prevScrollTop !== null && isScrolled !== null && items.length > 100){
            const element = document.querySelector('.book-list');
            element && element.scrollTo(0, prevScrollTop);
        }    
    }, [isScrolled]);

    const handlerClick = (event) =>{
        const key = event.target.dataset.keyId; /* делегирование, берем параметр с dataset от div в BookListItem */
        bookSelected(key, items);
    }

    const loadForwardData = (e) =>{
        if(( (items.length === 0) || (start+items.length) >= numFound) ) return; // больше нет книг
        else{
            setPrevScrollTop(e.target.scrollTop); // сохраняем позицию скрола

            const promise1 = fetchBooks(bookService.getBooks, searchString, Math.floor(start/100+2));
            promise1.then(data => {
                const {docs = []} = data;
                const newArray = [...items, ...docs];
                booksLoaded({...data, docs: [...newArray], [searchKey]: searchString});
                
                setIsScrolled((new Date()).getTime()); // для UseEffect, нужен скролл после перерисовки
            })
            .catch(err => {
                console.log(err);
                booksError(err);
            });
        }
    }

        /* обертка для устранения "дребезга" при скролле */
    const loadForwardDataWithThrottle = throttle(
        loadForwardData,
        2000
    ) ;

    const handlerScroll = (e) =>{
        if ((e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) === 0){
            loadForwardDataWithThrottle(e);
        }
    }

    const elements = items.map((item)=>{
        const key = item.key.split('/').pop();
        let selected = false;
        if (key===selectedKey) {
            selected = true;
        }
        const {language=[]} = item;
        return (
            <li key={key}>
                <BookListItem keyId={key} title={item.title} language={language.join(', ')} subtitle={item.subtitle} selected={selected}/>
            </li>
        );
    });

    const errorIndicator = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = (loading || error) ? null : 
        <ul onClick={(event)=>handlerClick(event)}>
            {elements}
        </ul>;

    return (
        <div className='book-list' onScroll={handlerScroll}>
            {spinner}
            {content}
            {errorIndicator}
        </div>
    );
}

const mapStateToProps = ({bookList, selectedBook: {selectedKey } }) => {
    const {books={}, loading, error} = bookList;

    return{
        books,
        loading,
        error,
        selectedKey
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        bookSelected: (key, book) => dispatch(bookSelected(key, book)),
        fetchBooks: fetchBooks(dispatch),
        booksLoaded: (newBooks) => dispatch(booksLoaded(newBooks)),
        booksError: (err) => dispatch(booksError(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);