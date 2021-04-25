import React, {useContext} from 'react';
import {connect} from 'react-redux';

import {fetchBooks, booksLoaded, booksError} from '../../store/actions';
import {withDebounce} from '../hoc-hfunc';
import {BookServiceContext} from '../book-service-context/book-service-context';
import './summary-info.scss';


const SummaryInfo = ({found, start, pageSize, search, fetchBooks, booksLoaded, booksError}) =>{
    const bookService = useContext(BookServiceContext);

    const handlerClick = (e, page) =>{
        const searchKey = Symbol.for('symbolSearchInfo'); /* во избежание затирания поля */
        const promise1 = fetchBooks(bookService.getBooks, search, page);

            /* withDebounce мог выдаст null при неотправленном запросе */
        if(promise1 !== null){
            promise1.then(data => {
                    booksLoaded({...data, [searchKey]: search});
            })
            .catch(err => booksError(err));
        }
    }

    const contentElement = (found===undefined) ? null :
    <>
        <span className='summary__info'>Found: {found} Start: {start} Page size: {pageSize}</span>
        <div className='summary__group-link'>
            <span className={'summary__page-link '.concat((start === 0) ? 'ui-link--disabled' : 'ui-link summary__page-link--enabled') }
                onClick={(start === 0) ? null : (e)=>handlerClick(e, Math.floor(start/100))}
            >
                Prev results
            </span>
            <span className={'summary__page-link '.concat(((start+pageSize) >= found) ? 'ui-link--disabled' : 'ui-link summary__page-link--enabled')}
                onClick={ ((start+pageSize) >= found) ? null : (e) => handlerClick(e, Math.floor(start/100+2))}
            >
                Next results
            </span>
        </div>
        <p className='summary__info summary__query_search' title={`Search query: ${search}`}>Search query: {search}</p>
    </>;

    return (
        <section className='summary'>
            {contentElement}
        </section>
    );
}

const mapStateToProps = ({bookList}) =>{
    const {books={}} = bookList;
    
    const symbolSearch = Symbol.for('symbolSearchInfo');

    const {numFound : found, start, docs, [symbolSearch]: search} = books;

    if( docs === undefined ) return {};
    
    return{
        found,
        start,
        pageSize: docs.length,
        search
    }
}

const mapDispatchToProps = (dispatch) => {
    const f = fetchBooks(dispatch);
    return {
        //fetchBooks: fetchBooks(dispatch)
        fetchBooks: withDebounce(f, 2000),
        booksLoaded: (newBooks) => dispatch(booksLoaded(newBooks)),
        booksError: (err) => dispatch(booksError(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryInfo);