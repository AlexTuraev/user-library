import React, {useState, useContext, useEffect} from 'react';
import {connect} from 'react-redux';

import {fetchBooks, booksLoaded, booksError} from '../../store/actions';
import {withDebounce} from '../hoc-hfunc';
import {BookServiceContext} from '../book-service-context/book-service-context';

import './search-panel.scss';

const SearchPanel = ({fetchBooks, booksLoaded, booksError}) => {
    const [valueInput, setValueInput] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isHotReload, setIsHotReload] = useState(null); /* принудительная загрузка по Enter и кнопке Go */
    const bookService = useContext(BookServiceContext);
    
    useEffect(()=>{
        let isStopLoading = false;

        const searchKey = Symbol.for('symbolSearchInfo'); /* во избежание затирания поля */
        const searchString = searchValue;

        if(searchString !== ''){
            const promise1 = fetchBooks(bookService.getBooks, searchString);

            promise1.then(data => {
                if(!isStopLoading) {
                    booksLoaded({...data, [searchKey]: searchString});
                } 
            })
            .catch(err => booksError(err));
        }

        return () => isStopLoading = true; /* отменяет загрузку данных, для старого активного запроса */
    }, [searchValue, isHotReload]);

    const handlerOnChange =(e) =>{
        setValueInput(e.target.value);
    }
    
    let intervalId; /* идентификатор старта onSearchSetValue с последнего нажатия клавиши */

    const handlerOnKeyUp = (e) =>{
        clearInterval(intervalId);
        if (e.target.value === '') return;

        if (e.code === 'Enter'){
            setSearchValue(e.target.value);
            setIsHotReload((new Date()).getTime());
        }else{
            intervalId = setTimeout(() => {
                setSearchValue(e.target.value);
            }, 1000);
        }
    }

    let intervalIdGo;
    const handlerOnBtnClick = () =>{
        clearInterval(intervalIdGo);
        intervalIdGo = setTimeout(()=>{
            setSearchValue(valueInput);
            setIsHotReload((new Date()).getTime());
        }, 200);
    }

    return(
        <section className='search-panel'>
            <div className='search-panel__block'>
                <input className='search-panel__input-search' onKeyUp={handlerOnKeyUp} onChange={handlerOnChange}
                    placeholder='Type search...' title='Type search... Press Enter or push Button Go to forced loading'/>
                <button className='search-panel__go-btn' onClick={handlerOnBtnClick} title='Push to start reloading'>
                    Go
                </button>
            </div>
        </section>
    );
}

const mapStateToProps = () =>({});

const mapDispatchToProps = (dispatch) => {
    const f = fetchBooks(dispatch);
    return {
        //fetchBooks: withDebounce(f, 2000),
        fetchBooks: f,

        booksLoaded: (newBooks) => dispatch(booksLoaded(newBooks)),
        booksError: (err) => dispatch(booksError(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);