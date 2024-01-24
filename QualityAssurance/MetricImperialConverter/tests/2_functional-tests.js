const chaiHttp = require('chai-http')
const chai = require('chai')
let assert = chai.assert
const server = require('../server')

chai.use(chaiHttp)

suite('Functional Tests', () => {
  suite('route tests', () => {
    suite('GET /api/convert', () => {
      test('convert 10L', (done) => {
        const input = '10L'
        const expected = {
          initNum: 10,
          initUnit: 'L',
          returnNum: 2.64172,
          returnUnit: 'gal',
          string: '10 liters converts to 2.64172 gallons',
        }

        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.deepEqual(res.body, expected)
            done()
          })
      })
    })
    suite('GET /api/convert', () => {
      test('convert 32g', (done) => {
        const input = '32g'
        const expected = 'invalid unit'

        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.strictEqual(res.body, expected)
            done()
          })
      })
    })
    suite('GET /api/convert', () => {
      test('convert 3/7.2/4kg', (done) => {
        const input = '3/7.2/4kg'
        const expected = 'invalid number'
        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.strictEqual(res.body, expected)
            done()
          })
      })
    })
    suite('GET /api/convert', () => {
      test('convert 3/7.2/4kilomegagram', (done) => {
        const input = '3/7.2/4kilomegagram'
        const expected = 'invalid number and unit'

        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.strictEqual(res.body, expected)
            done()
          })
      })
    })

    suite('GET /api/convert', () => {
      test('convert kg', (done) => {
        const input = 'kg'
        const expected = {
          initNum: 1,
          initUnit: 'kg',
          returnNum: 2.20462,
          returnUnit: 'lbs',
          string: '1 kilograms converts to 2.20462 pounds',
        }
        chai
          .request(server)
          .get('/api/convert')
          .query({ input })
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.deepEqual(res.body, expected)
            done()
          })
      })
    })
  })
})
