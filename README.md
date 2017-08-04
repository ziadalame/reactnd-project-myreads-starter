# React Book Library

This project is the assignment of the React Fundamentals section in the React Nanodegree Program by Udacity. 

## What You're Getting
```
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon, You may change if you wish.
+-- src/
 +-- componenets
  |-- Book.js
  |-- ListBooks.js
  |-- Search.js
  |-- Shelf.js
 +-- icons/
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 +-- utils
  |-- BooksAPI.js - A JavaScript API for the provided Udacity backend. 
 |-- App.css - Styles for your app. Feel free to customize this as you desire.
 |-- App.js - This is the root of your app. Contains static HTML right now.
 |-- App.test.js - Used for testing. Provided with Create React App. 
 |-- index.js - You should not need to modify this file. It is used for DOM rendering only.
 |-- index.css - Global styles. You probably won't need to change anything here.
|-- .gitignore 
|-- CONTRIBUTING.MD - Information about contributing to this repo. 
|-- README.MD - This README file.
|-- SEARCH_TERMS.md
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```

## Getting Started

```
git clone git@github.com:ziadalame/reactnd-project-myreads-starter.git
cd reactnd-project-myreads-starter
npm install
npm start
```

Once done, the app will run at: http://localhost:3000/

## Screenshots


## Backend Server

Below are the list of endpoints provided by Udacity to communicate with the server. The provided file [`BooksAPI.js`](src/utils/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 

## Contributing

Pull requests are welcomed. 

## Liscense

MIT.
