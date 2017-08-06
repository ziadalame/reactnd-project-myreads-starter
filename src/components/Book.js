import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid';

const Book = ({ book, changeShelf }) => {

    var { imageLinks, title, authors, shelf } = book

    return (
        <li key={shortid.generate()}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks !== undefined ? imageLinks.thumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf || 'none'} onChange={(changeEvent) => (changeShelf(book, changeEvent.target.value))}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors !== undefined ? authors.join(', ') : ''}</div>
            </div>
        </li>
    )

}

Book.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        authors: PropTypes.array,
        imageLinks: PropTypes.shape({
            thumbnail: PropTypes.string
        }),
        shelf: PropTypes.string
    }).isRequired,
    changeShelf: PropTypes.func // isRequired is not necessary as it is always available
}

export default Book
