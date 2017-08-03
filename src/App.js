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
            shelves: []
        }
    }

    // Fetch data after render finishes
    componentDidMount() {
        this.getAllBooks().then((shelves) => {
            this.setState({ shelves })
        })
    }

    getAllBooks() {
        return BooksAPI.getAll().then(allBooks => {
            // create json with unique self keys
            // each key has an array of books
            // this allows for dynamic shelf and book creation
            return _.groupBy(allBooks, (book) => (book.shelf))
        }, function (error) {
            console.log('An error has occurred. Details: ' + error)
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks
                        shelves={this.state.shelves} />
                )} />
                <Route path='/search' render={() => (<Search />)} />
            </div>
        )
    }
}

export default BooksApp
