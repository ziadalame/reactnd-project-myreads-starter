import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import _ from 'lodash'

class Search extends Component {

    render() {
        console.log(this.props)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.props.searchForBooks(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.error && (<div className="search-error">{this.props.error}</div>)}
                    <ol className="books-grid">
                        {this.props.books.map((book) => {
                            return (
                                <Book
                                    key={book.id}
                                    book={book}
                                    changeShelf={this.props.changeShelf}
                                />
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }

}

export default Search
