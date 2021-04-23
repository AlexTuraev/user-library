import React, {useContext} from 'react';
import {connect} from 'react-redux';

import {fetchBooks} from '../../store/actions';
import {BookServiceContext} from '../book-service-context/book-service-context';
import './summary-info.scss';


const SummaryInfo = ({found, start, pageSize, search, fetchBooks}) =>{
    const bookService = useContext(BookServiceContext);

    const text = (found===undefined) ? null :
    <>
        <span className='summary__info'>Found: {found} Start: {start} Page size: {pageSize}</span>
        <div className='summary__group-link'>
            <span className={'summary__page-link '.concat((start === 0) ? 'ui-link--disabled' : 'ui-link summary__page-link--enabled') }
                onClick={(start === 0) ? null : ()=>fetchBooks(bookService.getBooks, search, Math.floor(start/100))}
                >
                Prev results
            </span>
            <span className={'summary__page-link '.concat(((start+pageSize) >= found) ? 'ui-link--disabled' : 'ui-link summary__page-link--enabled')}
                onClick={ ((start+pageSize) >= found) ? null : ()=>fetchBooks(bookService.getBooks, search, Math.floor(start/100+2))}
                >
                Next results
            </span>
        </div>
    </>;

    return (
        <section className='summary'>
            {text}
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
    return {
        fetchBooks: fetchBooks(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryInfo);