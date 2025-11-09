const { hashPassword } = require('../db/data/utils/hash-password')
const bcrypt = require('bcrypt')

describe('hashPassword', () => {
    test('returned hash should be different from input password', async () => {
        const hash = await hashPassword('password')
        expect(typeof hash).toBe('string')
        expect(hash).not.toBe('password')
    })
    test('returned hash should match original password when compared', async () => {
        const hash = await hashPassword('password')
        const match = await bcrypt.compare('password', hash)
        expect(match).toBe(true)
    })
})