import * as names from '../actions/name-actions';

const initialSelectedBook = {
    book: {},
    selectedKey: null
}

const updateSelectedBook = (state, action) =>{
    if (state===undefined) return initialSelectedBook;

    switch(action.type){
        case names.BOOK_SELECTED: 
            return{
                ...state.selectedBook,
                book: action.payload.book,
                selectedKey: action.payload.selectedKey
            }
        default: return state.selectedBook;
    }
}

export default updateSelectedBook;