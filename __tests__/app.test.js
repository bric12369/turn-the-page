const app = require('../app')
const db = require('../db/connection')
const request = require('supertest')
const seed = require('../db/seed')

beforeEach(() => {
    return seed()
})
afterAll(() => {
    db.end()
})

describe('app', () => {
    describe('GET /api/books', () => {
        test('get request to /api/books returns an array of books', async () => {
            const { body } = await request(app).get('/api/books').expect(200)
            expect(body.books.length > 0).toBe(true)
        })
        test('each book should have the following properties: book_id, book_name, publication_date, author, isbn and price', async () => {
            const { body } = await request(app).get('/api/books')
            expect(body.books[0].book_id).toBe(1)
            expect(body.books[0].book_name).toBe('Heartstopper Vol. 1')
            expect(body.books[0].publication_date).toBe(2018)
            expect(body.books[0].author).toBe('Alice Osman')
            expect(body.books[0].isbn).toBe('9781527225336')
            expect(body.books[0].price).toBe('7.99')
        })
        describe('Queries', () => {
            describe('sort', () => {
                test('?sort=book_name orders the books alphabetically', async () => {
                    const { body } = await request(app).get('/api/books?sort=book_name').expect(200)
                    expect(body.books[0].book_name).toBe('A Game of Thrones')
                })
                test('?sort=price orders the books by price', async () => {
                    const { body } = await request(app).get('/api/books?sort=price').expect(200)
                    expect(body.books[0].book_name).toBe('Stormbreaker - Alex Rider')
                })
                test('?sort=author orders alphabetically by author name', async () => {
                    const { body } = await request(app).get('/api/books?sort=author').expect(200)
                    expect(body.books[0].author).toBe('Alice Osman')
                })
            })
            describe('order', () => {
                test('?order=desc when added to book_name sort filters books in reverse alphabetical order', async () => {
                    const { body } = await request(app).get('/api/books?sort=book_name&order=desc').expect(200)
                    expect(body.books[0].book_name).toBe('The War of the Worlds')
                    expect(body.books[1].book_name).toBe('The Shining')
                })
                test('?order=desc when added to price sort returns books from most expensive to least', async () => {
                    const { body } = await request(app).get('/api/books?sort=price&order=desc').expect(200)
                    expect(body.books[0].book_name).toBe('The War of the Worlds')
                    expect(body.books[1].book_name).toBe('The Hobbit: 75th Anniversary Edition')
                })
                test('?order=desc when added to author sort returns books by author in reverse alphabetical order', async () => {
                    const { body } = await request(app).get('/api/books?sort=author&order=desc').expect(200)
                    expect(body.books[0].author).toBe('Stephen King')
                })
                test('?order only accepts desc as a valid value, otherwise asc is default', async () => {
                    const { body } = await request(app).get('/api/books?sort=book_name&order=invalid-value').expect(200)
                    expect(body.books[0].book_name).toBe('A Game of Thrones')
                    const { body: body2 } = await request(app).get('/api/books?sort=book_name&order=desc').expect(200)
                    expect(body2.books[body2.books.length - 1].book_name).toBe('A Game of Thrones')
                })
                test('400 bad request is thrown when order=desc is provided without a sort value', async () => {
                    const { body } = await request(app).get('/api/books?order=desc').expect(400)
                    expect(body.msg).toBe('Bad Request: Cannot specify order without sort filter')
                })
            })
            describe('author_id', () => {
                test('?author_id filters books by author id', async () => {
                    const { body } = await request(app).get('/api/books?author_id=1').expect(200)
                    expect(body.books.length).toBe(1)
                    expect(body.books[0].book_name).toBe('Heartstopper Vol. 1')
                })
                test('400 bad request is thrown when author_id is invalid', async () => {
                    const { body } = await request(app).get('/api/books?author_id=NaN').expect(400)
                    expect(body.msg).toBe('Bad Request: invalid input')
                })
                test('404 not found is thrown with author_id does not exist', async () => {
                    const { body } = await request(app).get('/api/books?author_id=1000').expect(404)
                    expect(body.msg).toBe('Not found')
                })
            })
            describe('genre', () => {
                test('?genre filters books by genre', async () => {
                    const { body } = await request(app).get('/api/books?genre=Action').expect(200)
                    expect(body.books.length).toBe(1)
                })
                test('404 not found thrown when no matching genre found', async () => {
                    const { body } = await request(app).get('/api/books?genre=non-existent-genre').expect(404)
                    expect(body.msg).toBe('Not found')
                })
            })
        })
    })
    describe('GET /api/books/:id', () => {
        test('GET request to /api/books/:id returns a single book with matching id with the following properties: book_name, publication date, description, author, genre, condition, condition_description, isbn, price', async () => {
            const { body } = await request(app).get('/api/books/1').expect(200)
            expect(body.book.book_name).toBe('Heartstopper Vol. 1')
            expect(body.book.publication_date).toBe(2018)
            expect(body.book.description).toBe(`Shy and softhearted Charlie Spring sits next to rugby player Nick Nelson in class one morning. A warm and intimate friendship follows, and that soon develops into something more for Charlie, who doesn't think he has a chance. But Nick is struggling with feelings of his own, and as the two grow closer and take on the ups and downs of high school, they come to understand the surprising and delightful ways in which love works.`)
            expect(body.book.author).toBe('Alice Osman')
            expect(body.book.genre).toBe('LGBTQ+')
            expect(body.book.condition).toBe('Like New')
            expect(body.book.condition_description).toBe('Almost flawless with no obvious signs of usage. This book is perfect for readers who want an as new copy without the price.')
            expect(body.book.isbn).toBe('9781527225336')
            expect(body.book.price).toBe('7.99')
        })
        test('Throws 400 bad request error when given an invalid id', async () => {
            const { body } = await request(app).get('/api/books/NaN').expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
        })
        test('Throws 404 not found when given a valid id which does not exist', async () => {
            const { body } = await request(app).get('/api/books/1000').expect(404)
            expect(body.msg).toBe('Not found')
        })
    })
    describe('GET /api/authors', () => {
        test('GET request to /api/authors returns an array of all authors, each with the following properties: author_id, first_name, surname, avatar', async () => {
            const { body } = await request(app).get('/api/authors').expect(200)
            body.authors.forEach((author) => {
                expect(author).toHaveProperty('author_id')
                expect(author).toHaveProperty('first_name')
                expect(author).toHaveProperty('surname')
                expect(author).toHaveProperty('avatar')
            })
        })
        test('authors are ordered alphabetically by surname', async () => {
            const { body } = await request(app).get('/api/authors')
            expect(body.authors[0].surname).toBe('Horowitz')
            expect(body.authors[body.authors.length - 1].surname).toBe('Wells')
        })
        describe('Queries', () => {
            describe('order', () => {
                test('?order=desc returns authors by surname in reverse alphabetical order', async () => {
                    const { body } = await request(app).get('/api/authors?order=desc').expect(200)
                    expect(body.authors[0].surname).toBe('Wells')
                    expect(body.authors[body.authors.length - 1].surname).toBe('Horowitz')
                })
            })
        })
    })
    describe('GET /api/authors/:id', () => {
        test('GET request to /api/authors/:id returns a single author with the following properties: first_name, surname, avatar', async () => {
            const { body } = await request(app).get('/api/authors/1').expect(200)
            expect(body.author.first_name).toBe('Alice')
            expect(body.author.surname).toBe('Osman')
            expect(body.author.avatar).toBe('example.com/images/aliceosman.jpg')
        })
        test('returns 400 when id is invalid', async () => {
            const { body } = await request(app).get('/api/authors/NaN').expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
        })
        test('returns 404 when id does not exist', async () => {
            const { body } = await request(app).get('/api/authors/1000').expect(404)
            expect(body.msg).toBe('Not found')
        })
    })
    describe('POST /api/books', () => {
        test('successful POST request to /api/books adds new book to db and returns status 201 & new book_id', async () => {
            await request(app).get('/api/books/8').expect(404)
            const { body } = await request(app).post('/api/books').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 3,
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(201)
            expect(body.book_id).toBe(8)
            await request(app).get('/api/books/8').expect(200)
        })
        test('400 bad request when request body is missing a not null variable', async () => {
            const { body } = await request(app).post('/api/books').send({
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 3,
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(400)
            expect(body.msg).toBe('Bad Request: missing input')
        })
        test('400 bad request when an invalid data type is provided for a variable', async () => {
            const { body } = await request(app).post('/api/books').send({
                "book_name": "IT",
                "publication_date": "NaN",
                "description": "scary clown",
                "author_id": 3,
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
        })
        test('404 not found when author_id does not exist', async () => {
            const { body } = await request(app).post('/api/books').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 1000,
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(404)
            expect(body.msg).toBe('Not found')
        })
        test('400 bad request when author_id invalid', async () => {
            const { body } = await request(app).post('/api/books').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": "NaN",
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
        })
        test('404 not found thrown when genre does not exist', async () => {
            const { body } = await request(app).post('/api/books').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 3,
                "genre": "non-existent-genre",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(404)
            expect(body.msg).toBe('Not found')
        })
        test('404 not found thrown when condition does not exist', async () => {
            const { body } = await request(app).post('/api/books').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 3,
                "genre": "Horror",
                "condition": "non-existent-condition",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(404)
            expect(body.msg).toBe('Not found - foreign key violation')
        })
    })
    describe('GET /api/genres', () => {
        test('GET request to /api/genres returns an array of genre objects in alphabetical order, each with genre and description properties', async () => {
            const { body } = await request(app).get('/api/genres').expect(200)
            expect(body.genres[0].genre).toBe('Action')
            expect(body.genres[0].description).toBe('High-octane reads packed with fast-paced plots, daring heroes, and relentless danger. From explosive battles to heart-pounding chases, these stories keep you on the edge of your seat—perfect for thrill-seekers who love adrenaline-fueled adventures and nonstop excitement. Buckle up, it\'s going to get intense.')
        })
    })
    describe('GET /api/genres/:genre', () => {
        test('GET request to /api/genres/:genre returns single genre with matching id with genre and description properties', async () => {
            const { body } = await request(app).get('/api/genres/Action').expect(200)
            expect(body.genre.genre).toBe('Action')
            expect(body.genre.description).toBe('High-octane reads packed with fast-paced plots, daring heroes, and relentless danger. From explosive battles to heart-pounding chases, these stories keep you on the edge of your seat—perfect for thrill-seekers who love adrenaline-fueled adventures and nonstop excitement. Buckle up, it\'s going to get intense.')
        })
        test('404 not not found thrown when no matching genre found', async () => {
            const { body } = await request(app).get('/api/genres/non-existent-genre').expect(404)
            expect(body.msg).toBe('Not found')
        })
    })
    describe('POST /api/authors', () => {
        test('Successful POST to /api/authors adds new author to db, returns status 201 and new author_id', async () => {
            const { body } = await request(app).post('/api/authors').send({
                "first_name": "Charles",
                "surname": "Dickens",
                "avatar": "example.com/images/charlesdickens.jpg"
            }).expect(201)
            expect(body.author_id).toBe(8)
        })
        test('400 bad request thrown when missing not null input', async () => {
            const { body } = await request(app).post('/api/authors').send({
                "first_name": "Charles",
                "avatar": "example.com/images/charlesdickens.jpg"
            }).expect(400)
            expect(body.msg).toBe('Bad Request: missing input')
        })
    })
    describe('POST /api/genres', () => {
        test('Successful POST to /api/genres returns status 201 and the genre', async () => {
            const { body } = await request(app).post('/api/genres').send({
                "genre": "Thriller",
                "description": "A genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety."
            }).expect(201)
            expect(body.genre).toBe('Thriller')
        })
        test('400 bad request thrown when missing not null input', async () => {
            const { body } = await request(app).post('/api/genres').send({
                "genre": "Thriller"
            }).expect(400)
            expect(body.msg).toBe('Bad Request: missing input')
        })
    })
    describe('PATCH /api/books/:id', () => {
        test('Successful PATCH to /api/books/:id updates book with 1 matching column, returns the updated book and status 200', async () => {
            const { body } = await request(app).patch('/api/books/1').send({
                "publication_date": 1900
            }).expect(200)
            expect(body.book.publication_date).toBe(1900)
        })
        test('handles any number of given columns', async () => {
            const { body } = await request(app).patch('/api/books/1').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 3,
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            })
            expect(body.book).toEqual({
                book_id: 1,
                book_name: 'IT',
                publication_date: 1987,
                description: 'scary clown',
                author_id: 3,
                genre: 'Horror',
                condition: 'Very Good',
                isbn: '9780451159274',
                price: '8.49'
            })
        })
        test('400 bad request when book id invalid', async () => {
            const { body } = await request(app).patch('/api/books/NaN').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 3,
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
        })
        test('404 not found when book id does not exist', async () => {
            const { body } = await request(app).patch('/api/books/1000').send({
                "book_name": "IT",
                "publication_date": 1987,
                "description": "scary clown",
                "author_id": 3,
                "genre": "Horror",
                "condition": "Very Good",
                "isbn": "9780451159274",
                "price": "8.49"
            }).expect(404)
            expect(body.msg).toBe('Not found')
        })
        test('400 bad request when given an invalid author_id or publication_date', async () => {
            const { body } = await request(app).patch('/api/books/1').send({
                "author_id": 'NaN'
            }).expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
            const { body: body2 } = await request(app).patch('/api/books/1').send({
                "publication_date": "NaN"
            }).expect(400)
            expect(body2.msg).toBe('Bad Request: invalid input')
        })
        test('404 not found when given an author_id, genre or condition which does not exist', async () => {
            const { body } = await request(app).patch('/api/books/1').send({
                "author_id": 1000
            }).expect(404)
            expect(body.msg).toBe('Not found - foreign key violation')
            const { body: body2 } = await request(app).patch('/api/books/1').send({
                "genre": "non-existent-genre"
            }).expect(404)
            expect(body2.msg).toBe('Not found - foreign key violation')
            const { body: body3 } = await request(app).patch('/api/books/1').send({
                "condition": "non-existent-condition"
            }).expect(404)
            expect(body3.msg).toBe('Not found - foreign key violation')
        })
    })
    describe('PATCH /api/authors/:id', () => {
        test('Successful PATCH to /api/authors/:id returns updated author and status 200', async () => {
            const { body } = await request(app).patch('/api/authors/1').send({
                "first_name": "Barry"
            }).expect(200)
            expect(body.author.first_name).toBe('Barry')
        })
        test('Handles any number of given columns', async () => {
            const { body } = await request(app).patch('/api/authors/1').send({
                "first_name": "Barry",
                "surname": "Smith",
                "avatar": "example.com/images/barrysmith.jpg"
            }).expect(200)
            expect(body.author).toEqual({
                "author_id": 1,
                "first_name": "Barry",
                "surname": "Smith",
                "avatar": "example.com/images/barrysmith.jpg"
            })
        })
        test('400 bad request when given an invalid author id', async () => {
            const { body } = await request(app).patch('/api/authors/NaN').send({
                "first_name": "Barry"
            }).expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
        })
        test('404 not found when given an author_id which does not exist', async () => {
            const { body } = await request(app).patch('/api/authors/1000').send({
                "first_name": "Barry"
            }).expect(404)
            expect(body.msg).toBe('Not found')
        })
    })
    describe('DELETE /api/books/:id', () => {
        test('Successful DELETE to /api/books/:id returns 204 and deletes corresponding book', async () => {
            await request(app).delete('/api/books/1').expect(204)
            await request(app).get('/api/books/1').expect(404)
        })
        test('400 bad request when given an invalid book id', async () => {
            const { body } = await request(app).delete('/api/books/NaN').expect(400)
            expect(body.msg).toBe('Bad Request: invalid input')
        })
        test('404 not found when given a book_id which does not exist', async () => {
            const { body } = await request(app).delete('/api/books/1000').expect(404)
            expect(body.msg).toBe('Not found')
        })
    })
    describe('GET /api/users', () => {
        test('GET request to /api/users returns list of users, each with the following properties: first_name, surname, email, role', async () => {
            const { body } = await request(app).get('/api/users').expect(200)
            expect(body.users[0].first_name).toBe('Admin')
            expect(body.users[0].surname).toBe('1')
            expect(body.users[0].email).toBe('admin1@example.com')
            expect(body.users[0].role).toBe('admin')
        })
    })
})