
const replaceNamesWithIds = (books, authors) => {

    const formattedBooks = structuredClone(books)

    const authorNames = authors.map((a) => {
        return `${a.first_name} ${a.surname}`
    })

    for (const book of formattedBooks) {
        book.author_id = authorNames.indexOf(book.author) + 1
        delete book.author
    }
    return formattedBooks
}

module.exports = replaceNamesWithIds