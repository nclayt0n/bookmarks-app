import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext'
import './BookmarkItem.css';
import config from '../config'
import {withRouter} from 'react-router-dom'


function deleteBookmarkRequest(bookmarkId, callback,props) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer${config.API_KEY}`
    }
  }) 
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(bookmarkId)
    }) 
    .catch(error => {
      console.error(error)
    })
    props.history.push('/')
}
// https://bookmarks-app?token=IzsEoKLGoAhCCxeATLrFhO8R.now.sh

class BookmarkItem extends React.Component { 
  render(){
  return (
    <BookmarksContext.Consumer>
      {(context)=>(
       
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={this.props.bookmark.url}
            target='_blank'
            rel='noopener noreferrer'>
            {this.props.bookmark.title}
          </a>
        </h3>
        <Rating value={this.props.bookmark.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {this.props.bookmark.description}
      </p>
      <div className='BookmarkItem__buttons'>
      <button className='update_Bookmark' onClick={()=>{context.updateBookmarkId(this.props.bookmark,this.props.history)}}>Update</button>
        <button
          className='BookmarkItem__description'
          onClick={() => {deleteBookmarkRequest(this.props.bookmark.id,context.deleteBookmark,this.props
          )
          }}
        >
          Delete
        </button>
      </div>
    </li>
     )}
    </BookmarksContext.Consumer>
  )}
        }

  export default withRouter(BookmarkItem)