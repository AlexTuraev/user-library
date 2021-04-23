import React from 'react';

const BookServiceContext = React.createContext();
const BookServiceProvider = BookServiceContext.Provider;

export {
    BookServiceContext,
    BookServiceProvider
}