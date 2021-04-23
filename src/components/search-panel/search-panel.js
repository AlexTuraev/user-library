import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import {fetchBooks} from '../../store/actions';

import {BookServiceContext} from '../book-service-context/book-service-context';

import './search-panel.scss';

const SearchPanel = ({fetchBooks}) => {
    const [searchValue, setSearchValue] = useState('');
    const bookService = useContext(BookServiceContext);
    
    const handlerOnChange = (e) =>{
        setSearchValue(e.target.value);
    }

    function onSearchSetValue(value){
        if (value==='') return;

        console.log(value);
        //fetchBooks( bookService.getBooks, value.toUpperCase());
        fetchBooks( bookService.getBooks, value);
    }
    
    const handlerOnKeyDown = (e) =>{
        if (e.code === 'Enter') {
            onSearchSetValue(searchValue);
        }
    }

    const handlerOnBtnClick = () =>{
        onSearchSetValue(searchValue);
    }

    return(
        <section className='search-panel'>
            <div className='search-panel__block'>
                <input className='search-panel__input-search' onChange={handlerOnChange} onKeyDown={handlerOnKeyDown} 
                    placeholder='Type search...'/>
                <button className='search-panel__go-btn' onClick={handlerOnBtnClick}>Go</button>
            </div>
        </section>
    );
}

const mapStateToProps = () =>({});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: fetchBooks(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);