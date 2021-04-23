import * as names from '../actions/name-actions';

const initialBooksState = {
    books: {},
    loading: false,
    error: false,
    page: 1
}

const updateBooks = (state, action) =>{
    if (state===undefined) return initialBooksState;

    switch(action.type){
        case names.FETCH_BOOKS_REQUEST:
            return {
                ...state.bookList,
                books: {},
                loading: true,
                error: false,
                page: 1
            }
        case names.FETCH_BOOKS_SUCCESS:
            return {
                ...state.bookList,
                books: action.payload,
                loading: false,
                error: false
            }
            
        case names.FETCH_BOOKS_FAILURE:
            return {
                ...state.bookList,
                books: {},
                loading: false,
                error: action.payload
            }
        default: return state.bookList;
    }
}

export default updateBooks;