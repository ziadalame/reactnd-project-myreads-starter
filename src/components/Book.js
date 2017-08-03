import React from 'react'
import PropTypes from 'prop-types'

function Book({ book }) {

    var { id, imageLinks, title, authors } = book

    return (
        <li key={id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.toString()}</div>
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
    }).isRequired
}

export default Book
