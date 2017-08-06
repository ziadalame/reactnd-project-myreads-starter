import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
// Router
import { Route, Switch } from 'react-router-dom'
// Utilities
import _ from 'lodash';
// Components
import ListBooks from './components/ListBooks'
import Search from './components/Search'
import TheWildWest from './components/TheWildWest'
// Style
import './App.css'

class BooksApp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books: [],
            searchBooks: [],
            searchErrorMessage: false,
            queryString: ''
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
        // remove uneeded spaces
        queryString = queryString.trim()

        if (queryString.length > 0) {
            this.setState({
                queryString,
                searchBooks: []
            })
            BooksAPI.search(queryString, 20).then((response) => {
                if (response.hasOwnProperty('error')) {
                    this.setState({
                        searchErrorMessage: response.error,
                        searchBooks: []
                    })
                } else {
                    var intersectionBook = []
                    // Map over the response and search if the book exists in the currnt books. 
                    // If it exists return the book in library else return the book from search
                    let books = response.map((book) => {
                        intersectionBook = _.intersectionBy(this.state.books, [book], 'id')
                        if (intersectionBook.length > 0) {
                            return intersectionBook[0]
                        } else {
                            book.shelf = 'none'
                            return book
                        }
                    })

                    this.setState({
                        searchErrorMessage: false,
                        searchBooks: books
                    })
                }
            })
        }
    }

    render() {
        return (
            <div className="app">
                <Switch>
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
                            queryString={this.state.queryString}
                        />
                    )} />
                    <Route component={TheWildWest} />
                </Switch>
            </div>
        )
    }
}

export default BooksApp
