import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import _ from 'lodash'

import Shelf from './Shelf';

import '../App.css'

class ListBooks extends Component {

    render() {

        console.log(this.props);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {Object.keys(this.props.shelves).map((title) => {
                            return <Shelf key={title} title={_.startCase(title)} books={this.props.shelves[title]} />
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

export default ListBooks
