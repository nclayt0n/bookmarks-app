import React from 'react'

const BookmarksContext = React.createContext({
    bookmarkToUpdate: {},
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {},
    updateBookmark: () => {},
    updateBookmarkId: () => {},
})
export default BookmarksContext