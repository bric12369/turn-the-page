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
                    console.log(body)
                    expect(body.books[0].author).toBe('Stephen King')
                })
                test('?order only accepts desc as a valid value, otherwise asc is default', async () => {
                    const { body } = await request(app).get('/api/books?sort=book_name&order=invalid-value').expect(200)
                    expect(body.books[0].book_name).toBe('A Game of Thrones')
                    const { body: body2 } = await request(app).get('/api/books?sort=book_name&order=desc').expect(200)
                    expect(body2.books[body2.books.length-1].book_name).toBe('A Game of Thrones')
                })
            })
        })       
    })
})