import React from 'react'
import BookmarksContext from '../BookmarksContext'
import config from '../config'
import {Link,withRouter} from 'react-router-dom'
import Rating from '../Rating/Rating';

// const Required = () => (
//   <span className='AddBookmark__required'>*</span>
// )
 class UpdateBookmark extends React.Component{
    static contextType=BookmarksContext;
    constructor(){
        super()
        this.state = {
            error: null,
        };
    }
  handleSubmit=(e)=>{
    const bookmarkToUpdate=this.context.bookmarkToUpdate
    e.preventDefault()
if(e.target.title.value.length>0){
    bookmarkToUpdate.title=e.target.title.value
}else{
    bookmarkToUpdate.title=this.context.bookmarkToUpdate.title
}if(e.target.url.value.length>0){
    bookmarkToUpdate.url=e.target.url.value
}else{
    bookmarkToUpdate.url=this.context.bookmarkToUpdate.url
}if(e.target.description.value.length>0){
    bookmarkToUpdate.description=e.target.description.value
}else{
    bookmarkToUpdate.description=this.context.bookmarkToUpdate.description
}if(e.target.rating.value.length>0){
    bookmarkToUpdate.rating=e.target.rating.value
}else{
    bookmarkToUpdate.rating=this.context.bookmarkToUpdate.rating
}
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/${this.context.bookmarkToUpdate.id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmarkToUpdate),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer${config.API_KEY}`
      }
    })
    .then(this.context.updateBookmark({id:bookmarkToUpdate.id,description:bookmarkToUpdate.description,title:bookmarkToUpdate.title,rating:parseInt(bookmarkToUpdate.rating),url:bookmarkToUpdate.url}))
        .catch(error =>{
            this.setState({error})
        })
        this.setState=({
          id:bookmarkToUpdate.id,description:bookmarkToUpdate.description,title:bookmarkToUpdate.title,rating:parseInt(bookmarkToUpdate.rating),url:bookmarkToUpdate.url
        });
        this.props.history.push('/')
  }
    render(){
        const { error } = this.state 
        return(<>

       <div className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={this.context.bookmarkToUpdate.url}
            target='_blank'
            rel='noopener noreferrer'>
            {this.context.bookmarkToUpdate.title}
          </a>
        </h3>
        <Rating value={this.context.bookmarkToUpdate.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {this.context.bookmarkToUpdate.description}
      </p>
      <div className='BookmarkItem__buttons'>
      </div>
    </div>
            <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='1'
              min='1'
              max='5'
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button><Link to={'/'}>
              Cancel
            </Link></button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
        </>)
    }
}
export default withRouter(UpdateBookmark)