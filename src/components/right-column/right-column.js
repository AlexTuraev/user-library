import React from 'react';
import {connect} from 'react-redux';

import './right-column.scss';
import {removeBook, markReadBook} from '../../store/actions';

import UserBookList from '../user-book-list';
import RightColumnHeader from '../right-column-header';
//------------------------------------------------------------------------------------
const RightColumn = ({toReadBooks={}, removeBook, markReadBook, symbolMarkedKey}) =>{
    const {userBooks=[]} = toReadBooks;

    const countMarkedBooks = userBooks.reduce((acc, currBook)=>{
        if(currBook[symbolMarkedKey]) acc++;
        return acc;
    }, 0);
    
    return(
        <section  className='to-read-list'>
            <RightColumnHeader countBooks={userBooks.length} countMarkedBooks={countMarkedBooks}/>
            <UserBookList {...{userBooks, removeBook, markReadBook, symbolMarkedKey}}/>
        </section>
    );
}

//------------------------------------------------------------------------------------
const mapStateToProps = ({toReadBooks}) => {
    const symbolMarkedKey = Symbol.for('markedBookSymbol'); /* Доп поле [тип Symbol] у отмеченных книг */

    return {
        toReadBooks,
        symbolMarkedKey
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        removeBook: (key, userBooks) => dispatch(removeBook(key, userBooks)),
        //markReadBook: (key, userBooks, isRead) => dispatch(markReadBook(key, userBooks, isRead))
        markReadBook: (...args) => dispatch(markReadBook(...args))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightColumn);