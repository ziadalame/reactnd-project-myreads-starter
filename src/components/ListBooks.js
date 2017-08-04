import React from 'react'
// Link to rout to pages
import { Link } from 'react-router-dom'
// for manipulation of quick utiity function
import _ from 'lodash'
// Prop-type for vaidation
import PropTypes from 'prop-types'
// shelf component
import Shelf from './Shelf';

function ListBooks(props) {

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {Object.keys(props.shelves).map((title) => {
                        return (<Shelf
                            key={title}
                            title={_.startCase(title)}
                            books={props.shelves[title]}
                            changeShelf={props.changeShelf}
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

ListBooks.propTypes = {
    shelves: PropTypes.object.isRequired,
    changeShelf: PropTypes.func // isRequired is not necessary as it is always available
}

export default ListBooks
