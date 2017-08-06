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
            books: [],
            searchBooks: [],
            searchErrorMessage: false
        }

        // Throtle search to not spam the server
        this.searchForBooks = _.debounce(this.searchForBooks, 1000);
    }

    // Fetch data after render finishes
    componentDidMount() {
        this.getAllBooks().then((data) => {
            this.setState({ books: data })
        })
    }

    getAllBooks = () => {
        return BooksAPI.getAll().then(books => {
            return books
        }, function (error) {
            console.log('An error has occurred. Details: ' + error)
        })
    }

    changeShelf = (selectedBook, newShelf) => {
        let oldShelf = selectedBook.shelf
        selectedBook.shelf = newShelf
        let books = this.state.books.filter(book => book.id !== selectedBook.id).concat(selectedBook)
        this.setState({
            books
        })
        // Send request to update book
        BooksAPI.update(selectedBook, newShelf).then((book) => {
            // All is good. Show some side notification of success or saved.
            console.log('success')
        }, (error) => {
            // an error has occured - show some error sign 
            console.log('error', error)
            selectedBook.shelf = oldShelf
            let books = this.state.books.filter(book => book.id !== selectedBook.id).concat(selectedBook)
            this.setState({
                books
            })

        })
    }

    searchForBooks = (queryString) => {
        queryString = queryString.trim()

        if (queryString.length > 0) {
            BooksAPI.search(queryString, 20).then((response) => {
                if (response.hasOwnProperty('error')) {
                    this.setState({
                        searchErrorMessage: response.error,
                        searchBooks: []
                    })
                } else {
                    this.setState({
                        searchErrorMessage: false,
                        searchBooks: response
                    })
                }
            })
        }
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks
                        books={this.state.books}
                        changeShelf={this.changeShelf}
                    />
                )} />
                <Route path='/search' render={() => (
                    <Search
                        searchForBooks={this.searchForBooks}
                        changeShelf={this.changeShelf}
                        books={this.state.searchBooks}
                        error={this.state.searchErrorMessage}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp
