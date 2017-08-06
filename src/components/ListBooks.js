import React from 'react'
// Link to rout to pages
import { Link } from 'react-router-dom'
// for manipulation of quick utiity function
import _ from 'lodash'
// Prop-type for vaidation
import PropTypes from 'prop-types'
// shelf component
import Shelf from './Shelf';

const ListBooks = (props) => {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div>
                        <Shelf
                            books={props.books.filter(book => book.shelf === 'currentlyReading')}
                            key='currentlyReading'
                            title='Currently Reading'
                            changeShelf={props.changeShelf}
                        />
                        <Shelf
                            books={props.books.filter(book => book.shelf === 'wantToRead')}
                            key='wantToRead'
                            title='Want To Read'
                            changeShelf={props.changeShelf}
                        />
                        <Shelf
                            books={props.books.filter(book => book.shelf === 'read')}
                            key='read'
                            title='Read'
                            changeShelf={props.changeShelf}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        </div>
    )

}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func // isRequired is not necessary as it is always available
}

export default ListBooks
