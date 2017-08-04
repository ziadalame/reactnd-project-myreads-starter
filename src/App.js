import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
// Router
import { Route } from 'react-router-dom'
// Utilities
import _ from 'lodash';
// Components
import ListBooks from './components/ListBooks'
import Search from './components/Search'
// Style
import './App.css'

class BooksApp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allBooks: [],
            shelves: {
                currentlyReading: [],
                wantToRead: [],
                read: []
            }
        }
    }

    // Fetch data after render finishes
    componentDidMount() {
        this.getAllBooks().then((data) => {
            this.setState(data)
        })
    }

    getAllBooks = () => {
        return BooksAPI.getAll().then(allBooks => {
            // create json with unique self keys
            // each key has an array of books
            // this allows for dynamic shelf and book creation
            return { shelves: _.groupBy(allBooks, (book) => (book.shelf)), allBooks }
        }, function (error) {
            console.log('An error has occurred. Details: ' + error)
        })
    }

    changeShelf = (bookId, newShelf) => {
        // Keep track of shelves if something goes wrong in request
        var shelvesBeforeRequest = this.state.shelves

        // This is a local solution to update the state 
        // Assume all will go well with the server and update the view. 
        // If an error happens, the view will be updated again below in the error function of the promise
        // A different solution would be to send a network request to retrieve the new list of books for the user
        var allBooks = this.state.allBooks.map(book => {
            if (book.id === bookId) {
                book.shelf = newShelf
            }
            return book
        })

        this.setState({
            shelves: _.groupBy(allBooks, (book) => (book.shelf))
        })

        // Send request to update book
        BooksAPI.update(bookId, newShelf).then(() => {

            // All is good. Show some side notification of success or saved.
            console.log('success')

        }, (error) => {
            // an error has occured - show some error sign 
            console.log('error', error)

            // change state to old state as changes were not saved
            this.setState({
                shelves: shelvesBeforeRequest
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks
                        shelves={this.state.shelves}
                        changeShelf={this.changeShelf}
                    />
                )} />
                <Route path='/search' render={() => (<Search />)} />
            </div>
        )
    }
}

export default BooksApp
