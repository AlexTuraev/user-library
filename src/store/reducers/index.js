import updateBooks from './update-books';
import updateSelectedBook from './update-selected-book';
import updateToReadBooks from './updateToReadBooks';

const reducer = (state, action)=> {
    return{
        bookList: updateBooks(state, action),
        selectedBook: updateSelectedBook(state, action),
        toReadBooks: updateToReadBooks(state, action)
    }
}

export default reducer;