// require ('dotenv').config();
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import UpdateBookmark from './updateBookmark/updateBookmark'
import config from './config';
import './App.css';
import BookmarksContext from './BookmarksContext';
import Rating from './Rating/Rating'

class App extends Component {
    static defaultProps={
    description: "personal profiles",
id: 1,
rating: 3,
title: "Fbook",
url: "https://www.facebook.com/",
}

    state = {
        bookmarks:[{
            description: "personal profiles",
        id: 1,
        rating: 3,
        title: "Fbook",
        url: "https://www.facebook.com/",
        },],
        error: null,
        updateBookmark:{}
    };
    setBookmarks = bookmarks => {
        this.setState({
            bookmarks,
            error: null,
        })
    }
    addBookmark = bookmark => {
        this.setState({
            bookmarks: [...this.state.bookmarks, bookmark],
        })
    }
    deleteBookmark=bookmarkId=>{
      const newBookmarks=this.state.bookmarks.filter(bm=>
        bm.id!==bookmarkId
        )
        this.setState({
          bookmarks:newBookmarks
        })
    }
    updateBookmarkId=(bookmark,history)=>{
        this.setState({
            updateBookmark:bookmark
        })
        console.log(bookmark,history)
        history.push('/update-bookmark')
       
    }
    updateBookmark=bookmark=>{
        this.setState({
            bookmarks:bookmark,...this.state.bookmarks
})
    }
    componentDidMount() {
        fetch(config.API_ENDPOINT, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer${config.API_TOKEN}`
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(this.setBookmarks)
            .catch(error => this.setState({ error }))
    }

    render() {
        console.log(this.state)
        const contextValue={
        bookmarkToUpdate:this.state.updateBookmark,
          bookmarks:this.state.bookmarks,
          addBookmark:this.addBookmark,
          deleteBookmark:this.deleteBookmark,
          updateBookmark:this.updateBookmark,
          updateBookmarkId:this.updateBookmarkId,
        }
        return ( 
        <main className = 'App'>
            <h1> Bookmarks! </h1> 
            
              <BookmarksContext.Provider value={contextValue}>
            <Nav/>
             <div className = 'content'
            aria-live = 'polite' >
            <Route path = '/add-bookmark'
            component={AddBookmark}
            /> 
            <Route exact path = '/'
            // component={BookmarkList}
            render={()=>{
                return <BookmarkList bookmarks={this.state.bookmarks}/>
            }}
            /> 
            <Route path='/update-bookmark' component={UpdateBookmark}/>
            </div> 
            </BookmarksContext.Provider>
            <Rating value={5}/>
            </main>
        );
    }
}

export default App;