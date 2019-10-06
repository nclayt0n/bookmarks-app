import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css'
import BookmarksContext from '../BookmarksContext'
import PropTypes from 'prop-types'
const uuidv4 = require('uuid/v4');
export default class BookmarkList extends Component {
  static contextType=BookmarksContext;

  render() {
    const { bookmarks } = this.context
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>

          <Route exact path = '/'
            render={({history})=>{
                return <BookmarkItem updateBookmarkId={()=>history.push('/')}
                deleteBookmarkRequest={()=>history.push('/')} key={uuidv4()} bookmark={bookmark}
              />
            }}
            /> 
          )}
        </ul>
      </section>
    );
  }
}

BookmarkList.propTypes={
  bookmarks:PropTypes.arrayOf(PropTypes.shape({
    title:PropTypes.string.isRequired,
    url:PropTypes.string.isRequired,
    rating:PropTypes.number,
    description:PropTypes.string
  }))
}
