import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import './app.scss';
import LeftColumn from '../left-column';
import CenterColumn from '../center-column';
import RightColumn from '../right-column';
import {loadFromStorageToReadList} from '../../store/actions';

const App = ({loadFromStorageToReadList}) =>{

    useEffect(()=>{
        // Load from LocalStorage
        loadFromStorageToReadList();
        console.log('Load from LocalStorage...');
    }, []);

    return (
        <main className='main'>
            <LeftColumn />
            <CenterColumn />
            <RightColumn />
        </main>
    );
}

const mapStateToProps = () =>({});

const mapDispatchToProps = (dispatch) =>{
    return{
        loadFromStorageToReadList: () => dispatch(loadFromStorageToReadList ())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);