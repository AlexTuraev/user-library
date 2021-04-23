import * as names from '../actions/name-actions';

const initialToReadBooks = {
    userBooks: []
}

const updateToReadBook = (state, action) =>{
    if (state===undefined) return initialToReadBooks;

    switch(action.type){
        case names.ADD_BOOK: 
            return{
                ...state.toReadBooks,
                userBooks: action.payload
            }
        case names.REMOVE_BOOK:
            return{
                ...state.toReadBooks,
                userBooks: action.payload
            }
        case names.MARK_READ_BOOK:
            return{
                ...state.toReadBooks,
                userBooks: action.payload
            }
        case names.LOAD_READ_BOOK:
            return{
                ...state.toReadBooks,
                userBooks: action.payload
            }
        default: return state.toReadBooks;
    }
}

export default updateToReadBook;