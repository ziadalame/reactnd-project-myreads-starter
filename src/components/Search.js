import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import _ from 'lodash'
import shortid from 'shortid';

class Search extends Component {

    componentDidMount() {
        // This is to add some books when the search page opens and there was no previous search
        if (this.props.books.length === 0) {
            this.props.searchForBooks('Shakespeare')
        }
    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.props.searchForBooks(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.queryString && (<div className="search-query" >Showing results for: {this.props.queryString}</div>)}
                    {this.props.error && (<div className="search-error">{this.props.error}</div>)}
                    <ol className="books-grid">
                        {this.props.books.map((book) => {
                            return (
                                <Book
                                    key={shortid.generate()}
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
