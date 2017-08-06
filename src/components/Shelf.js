import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

// Shelf is a functinoal component that only has a render method. 
// Instead of creating a class, I created shelf as a function. 
// Props is now accessed as a first parameter thus making this component independent from context
const Shelf = ({ title, books, changeShelf }) => {


    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book
                            key={title + book.id}
                            book={book}
                            changeShelf={changeShelf}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array, // Might be empty
    changeShelf: PropTypes.func // isRequired is not necessary as it is always available
}

export default Shelf
