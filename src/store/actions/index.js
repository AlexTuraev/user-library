import * as names from './name-actions';
//import {withDebounce} from '../../components/hoc-hfunc';

const booksRequested = () =>{
    return{
        type: names.FETCH_BOOKS_REQUEST
    }
}

const booksError = (error) =>{
    return{
        type: names.FETCH_BOOKS_FAILURE,
        payload: error
    }
}

const booksLoaded = (newBooks) => {
    return{
        type: names.FETCH_BOOKS_SUCCESS,
        payload: newBooks
    }
}

const fetchBooks = (dispatch) => (getBooks, search='', page=1) =>{
    console.log(`search = ${search}, page = ${page}`);

    //const searchKey = Symbol.for('symbolSearchInfo'); /* во избежание затирания поля */

    dispatch(booksRequested()); /* "обнуление" данных загруженных книг */

    return getBooks(search.toUpperCase(), page);

    /*getBooks(search.toUpperCase(), page)
        .then(data => {
            dispatch(booksLoaded({...data, 
                [searchKey]: search}));
        })
        .catch(err => dispatch(booksError(err)));*/

}

// ------------------------------------------------------------------
const bookSelected = (key, books=[])=>{
    const book = books.find(book=> ( book.key.split('/').pop() === key ) );
    console.log(book);

    return{
        type: names.BOOK_SELECTED,
        payload: {
            book: book, 
            selectedKey: key
        }
    }
}

// ------------------------------------------------------------------
const loadFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

/* key - строка, savedData - объект */
const saveToLocalStorage = (key, savedData) => {
    localStorage.setItem(key, JSON.stringify(savedData));
}
// ------------------------------------------------------------------
const saveToLocalStorageUserBooks = (userBooks=[]) =>{
    const markedKey = Symbol.for('markedBookSymbol');
    
    const savedBooks = userBooks.map(book=>{
        return{
            isMarkedRead: book[markedKey],
            bookObject: {...book}
        }
    })

    saveToLocalStorage('userbooks', savedBooks);
}


// ------------------------------------------------------------------

const loadFromStorageToReadList = () =>{
    const markedKey = Symbol.for('markedBookSymbol');
    let books = loadFromLocalStorage('userbooks');
    if (books===null) books = [];
    
    const transformedBooks = books.map(item =>{
        const { bookObject, isMarkedRead } = item;
        return {...bookObject, [markedKey] : isMarkedRead}
    });

    return{
        type: names.LOAD_READ_BOOK,
        payload: transformedBooks
    }
}

const addToReadBook = (newBook={}, userBooks=[]) => {
    const isBookExist = userBooks.find(book => newBook.key===book.key);
    const newBooks = isBookExist ? [...userBooks] : [{...newBook}, ...userBooks];

    if( !isBookExist ){
        saveToLocalStorageUserBooks([...newBooks]);
    }else{
        alert('This book is already on the list');
    }

    return{
        type: names.ADD_BOOK,
        payload: newBooks
    }
}

const removeBook = (key, books=[]) =>{
    const idx = books.findIndex(book => book.key===key);
    const newBooks = (idx === -1) ? [...books] : [...books.slice(0,idx), ...books.slice(idx+1)];

    if( idx !== -1){
        saveToLocalStorageUserBooks([...newBooks]);
    }

    return{
        type: names.REMOVE_BOOK,
        payload: newBooks
    }
}

const markReadBook = (key, books=[], isRead) =>{
    const idx = books.findIndex(book => book.key===key);
    const markedKey = Symbol.for('markedBookSymbol');

    const newBooks = (idx === -1) ? [...books] :          // без изменений
        [...books.slice(0,idx), 
            {...books[idx], [markedKey] : isRead }, // новая книга с полем [ключ типа Symbol] : true/false
            ...books.slice(idx+1)];

    if( idx !== -1){
        saveToLocalStorageUserBooks([...newBooks]);
    }

    return{
        type: names.MARK_READ_BOOK,
        payload: newBooks
    }
}

//const fetchBooksDebounce = withDebounce(fetchBooks, 2000);

export {
    booksLoaded,
    booksError,
    fetchBooks,
    bookSelected,
    addToReadBook,
    removeBook,
    markReadBook,
    loadFromStorageToReadList
}