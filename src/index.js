import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.scss';

import ErrorBoundry from './components/error-boundry';
import BookService from './services/book-services';
import {BookServiceProvider} from './components/book-service-context';
import App from './components/app';
import store from './store/store';

const bookService = new BookService('https://openlibrary.org/search.json');

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundry>
      <Provider store={store}>
        <BookServiceProvider value={bookService}>
          <App />
        </BookServiceProvider>
      </Provider>
    </ErrorBoundry>
  </React.StrictMode>,
  document.getElementById('root')
);