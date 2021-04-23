import React from 'react';

import './left-column.scss';
import SearchPanel from '../search-panel';
import SummaryInfo from '../summary-info';
import BookList from '../book-list';

const LeftColumn = () =>{

    return (
        <section className='left-column'>
            <SearchPanel />
            <BookList />
            <SummaryInfo />
        </section>
    );
}

export default LeftColumn;