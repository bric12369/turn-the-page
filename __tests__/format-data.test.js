const replaceNamesWithIds = require('../db/data/utils/format-data')
const { booksData, authorsData } = require('../db/data/test')

describe('replaceNamesWithIds', () => {
    test('takes a single an array of single book and an array of single matching author. Replaces the author in book with an author_id, 1', () => {
        const book = [
            {
                "book_name": "Heartstopper Vol. 1",
                "publication_date": "2018",
                "description": "Shy and softhearted Charlie Spring sits next to rugby player Nick Nelson in class one morning. A warm and intimate friendship follows, and that soon develops into something more for Charlie, who doesn't think he has a chance. But Nick is struggling with feelings of his own, and as the two grow closer and take on the ups and downs of high school, they come to understand the surprising and delightful ways in which love works.",
                "author": "Alice Osman",
                "genre": "LGBTQ+",
                "condition": "Like New",
                "isbn": "9781527225336",
                "price": "7.99"
            }
        ]
        const author = [
            {
                "first_name": "Alice",
                "surname": "Osman",
                "avatar": "example.com/images/aliceosman.jpg"
            }
        ]
        const result = replaceNamesWithIds(book, author)
        expect(result[0].author_id).toBe(1)
        expect(result[0]).not.toHaveProperty('author')
    })
    test('doesn\'t mutate inputs', () => {
        const book = [
            {
                "book_name": "Heartstopper Vol. 1",
                "publication_date": "2018",
                "description": "Shy and softhearted Charlie Spring sits next to rugby player Nick Nelson in class one morning. A warm and intimate friendship follows, and that soon develops into something more for Charlie, who doesn't think he has a chance. But Nick is struggling with feelings of his own, and as the two grow closer and take on the ups and downs of high school, they come to understand the surprising and delightful ways in which love works.",
                "author": "Alice Osman",
                "genre": "LGBTQ+",
                "condition": "Like New",
                "isbn": "9781527225336",
                "price": "7.99"
            }
        ]
        const author = [
            {
                "first_name": "Alice",
                "surname": "Osman",
                "avatar": "example.com/images/aliceosman.jpg"
            }
        ]
        const bookCopy = structuredClone(book)
        const authorCopy = structuredClone(author)
        replaceNamesWithIds(book, author)
        expect(book).toEqual(bookCopy)
        expect(author).toEqual(authorCopy)        
    })
    test('takes an array of 2 books and an array of single matching author and replaces author in both with author_id, 1', () => {
        const books = [
            {
                "book_name": "Heartstopper Vol. 1",
                "publication_date": "2018",
                "description": "Shy and softhearted Charlie Spring sits next to rugby player Nick Nelson in class one morning. A warm and intimate friendship follows, and that soon develops into something more for Charlie, who doesn't think he has a chance. But Nick is struggling with feelings of his own, and as the two grow closer and take on the ups and downs of high school, they come to understand the surprising and delightful ways in which love works.",
                "author": "Alice Osman",
                "genre": "LGBTQ+",
                "condition": "Like New",
                "isbn": "9781527225336",
                "price": "7.99"
            },
            {
                "book_name": "Heartstopper Vol. 2",
                "publication_date": "2018",
                "description": "XXXXXXXXXXX",
                "author": "Alice Osman",
                "genre": "LGBTQ+",
                "condition": "Like New",
                "isbn": "978152722XXX",
                "price": "7.99"
            }
        ]
        const author = [
            {
                "first_name": "Alice",
                "surname": "Osman",
                "avatar": "example.com/images/aliceosman.jpg"
            }
        ]
        const result = replaceNamesWithIds(books, author)
        result.forEach((book) => {
            expect(book.author_id).toBe(1)
            expect(book).not.toHaveProperty('author')
        })
    })
    test('takes an array of 2 books and an array of 2 authors, 1 matching each book. Replaces author in each book with corresponding author_id depending on position in the array', () => {
        const books = [
            {
                "book_name": "XXX",
                "author": "Alice Osman"
            },
            {
                "book_name": "YYY",
                "author": "Stephen King"
            }
        ]
        const authors = [
            {
                "first_name": "Alice",
                "surname": "Osman",
                "avatar": "example.com/images/aliceosman.jpg"
            },
            {
                "first_name": "Stephen",
                "surname": "King",
                "avatar": "example.com/images/stephenking.jpg"
            }
        ]
        const result = replaceNamesWithIds(books, authors)
        result.forEach((book) => {
            expect(book).not.toHaveProperty('author')
        })
        expect(result[0].author_id).toBe(1)
        expect(result[1].author_id).toBe(2)
    })
    test('takes a longer array of books and authors and replaces author in each book with the corresponding author_id', () => {
        const books = booksData
        const authors = authorsData
        const result = replaceNamesWithIds(books, authors)
        result.forEach((book) => {
            expect(book).not.toHaveProperty('author')
        })
        expect(result[0].author_id).toBe(1)
        expect(result[1].author_id).toBe(2)
        expect(result[3].author_id).toBe(4)
        expect(result[5].author_id).toBe(6)
    })
})