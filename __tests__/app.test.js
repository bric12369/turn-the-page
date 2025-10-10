const app = require('../app')
const db = require('../db/connection')
const request = require('supertest')

afterAll(() => {
    db.end()
})

describe('app', () => {
    describe('GET /api/books', () => {
        test('get request to /api/books returns an array of books', async () => {
            const { body } = await request(app).get('/api/books').expect(200)
            expect(body.books.length > 0).toBe(true)
        })
        test('each book should have the following properties: book_name, publication_date, author, isbn and price', async () => {
            const { body } = await request(app).get('/api/books')
            expect(body.books[0].book_name).toBe('Heartstopper Vol. 1')
            expect(body.books[0].publication_date).toBe(2018)
            expect(body.books[0].author).toBe('Alice Osman')
            expect(body.books[0].isbn).toBe('9781527225336')
            expect(body.books[0].price).toBe('7.99')
        })
        describe('Queries', () => {
            describe('filter', () => {
                test('?filter=book_name orders the books alphabetically', async () => {
                    const { body } = await request(app).get('/api/books?filter=book_name').expect(200)
                    expect(body.books[0].book_name).toBe('A Game of Thrones')
                })
            })
        })       
    })
})