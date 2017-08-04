import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import _ from 'lodash'

import PropTypes from 'prop-types'

import Shelf from './Shelf';

import '../App.css'

class ListBooks extends Component {

    render() {

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(this.props.shelves).map((title) => {
                            return (<Shelf
                                key={title}
                                title={_.startCase(title)}
                                books={this.props.shelves[title]}
                                changeShelf={this.props.changeShelf}
                            />)
                        })}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

ListBooks.propTypes = {
    shelves: PropTypes.object.isRequired,
    changeShelf: PropTypes.func // isRequired is not necessary as it is always available
}

export default ListBooks
