import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
// Router
import { Route } from 'react-router-dom'
// Components
import ListBooks from './components/ListBooks'
import Search from './components/Search'
// Style
import './App.css'

class BooksApp extends Component {

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (<ListBooks />)} />
                <Route path='/search' render={() => (<Search />)} />
            </div>
        )
    }
}

export default BooksApp
