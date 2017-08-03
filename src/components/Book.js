import React, { Component } from 'react'
import Proptypes from 'prop-types'

import '../App.css'

class Book extends Component {

    render() {

        var { cover, title, authors } = this.props

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("`${cover}`")' }}></div>
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
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    cover: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    authors: Proptypes.string.isRequired
}

export default Book
