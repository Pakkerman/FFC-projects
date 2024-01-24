const chai = require('chai')
let assert = chai.assert
const ConvertHandler = require('../controllers/convertHandler.js')

let convertHandler = new ConvertHandler()

suite('Unit Tests', () => {
  suite('convertHandler.getNum()', () => {
    test('getNum("4l")', (done) => {
      const input = '4l'
      const result = convertHandler.getNum(input)
      const expected = 4

      assert.strictEqual(result, expected)
      done()
    })
    test('getNum("4.2l")', (done) => {
      const input = '4.2l'
      const result = convertHandler.getNum(input)
      const expected = 4.2

      assert.strictEqual(result, expected)
      done()
    })
    test('getNum("2/3l")', (done) => {
      const input = '2/3l'
      const result = convertHandler.getNum(input)
      const expected = 2 / 3

      assert.strictEqual(result, expected)
      done()
    })
    test('getNum("1.5/3")', (done) => {
      const input = '1.5/3'
      const result = convertHandler.getNum(input)
      const expected = 1.5 / 3

      assert.strictEqual(result, expected)
      done()
    })
    test('getNum("3/2/3l")', (done) => {
      const input = '3/2/3l'
      const result = convertHandler.getNum(input)
      const expected = undefined

      assert.strictEqual(result, expected)
      done()
    })
    test('getNum("l")', (done) => {
      const input = 'l'
      const result = convertHandler.getNum(input)
      const expected = 1

      assert.strictEqual(result, expected)
      done()
    })
  })
  suite('convertHandler.getUnit()', () => {
    test('getUnit()', (done) => {
      const input = [
        'l',
        'gal',
        'kg',
        'lbs',
        'km',
        'mi',
        'L',
        'GAL',
        'KG',
        'LBS',
        'KM',
        'MI',
      ]
      const expected = [
        'L',
        'gal',
        'kg',
        'lbs',
        'km',
        'mi',
        'L',
        'gal',
        'kg',
        'lbs',
        'km',
        'mi',
      ]

      for (let i = 0; i < input.length; i++) {
        const result = convertHandler.getUnit(input[i])
        assert.strictEqual(result, expected[i])
      }
      done()
    })
    test('getUnit("34kilograms")', (done) => {
      const input = '34kilograms'
      const result = convertHandler.getUnit(input)
      const expected = undefined

      assert.strictEqual(result, expected)
      done()
    })
  })
  suite('convertHandler.getReturnUnit()', () => {
    test('getReturnUnit()', (done) => {
      const input = [
        'l',
        'gal',
        'kg',
        'lbs',
        'km',
        'mi',
        'L',
        'GAL',
        'KG',
        'LBS',
        'KM',
        'MI',
      ]
      const expected = [
        'gal',
        'L',
        'lbs',
        'kg',
        'mi',
        'km',
        'gal',
        'L',
        'lbs',
        'kg',
        'mi',
        'km',
      ]

      for (let i = 0; i < input.length; i++) {
        const result = convertHandler.getReturnUnit(input[i])
        assert.strictEqual(result, expected[i])
      }

      done()
    })
  })
  suite('convertHandler.spellOutUnit()', () => {
    test('spelloutUnit()', (done) => {
      const input = [
        'l',
        'gal',
        'kg',
        'lbs',
        'km',
        'mi',
        'L',
        'GAL',
        'KG',
        'LBS',
        'KM',
        'MI',
      ]
      const expected = [
        'liters',
        'gallons',
        'kilograms',
        'pounds',
        'kilometers',
        'miles',
        'liters',
        'gallons',
        'kilograms',
        'pounds',
        'kilometers',
        'miles',
      ]

      for (let i = 0; i < input.length; i++) {
        const result = convertHandler.spellOutUnit(input[i])
        assert.strictEqual(result, expected[i])
      }

      done()
    })
  })

  suite('convertHandler.convert()', () => {
    test('convert gal to L.', (done) => {
      const [number, unit] = [1, 'gal']
      const result = convertHandler.convert(number, unit)
      const expected = 3.78541

      assert.strictEqual(result, expected)
      done()
    })
    test('convert L to gal.', (done) => {
      const [number, unit] = [1, 'l']
      const result = convertHandler.convert(number, unit)
      const expected = 0.26417

      assert.strictEqual(result, expected)
      done()
    })
    test('convert mi to km.', (done) => {
      const [number, unit] = [1, 'mi']
      const result = convertHandler.convert(number, unit)
      const expected = 1.60934

      assert.strictEqual(result, expected)
      done()
    })
    test('convert km to mi.', (done) => {
      const [number, unit] = [1, 'km']
      const result = convertHandler.convert(number, unit)
      const expected = 0.62137

      assert.strictEqual(result, expected)
      done()
    })
    test('convertHandler should correctly convert lbs to kg.', (done) => {
      const [number, unit] = [1, 'lbs']
      const result = convertHandler.convert(number, unit)
      const expected = 0.45359

      assert.strictEqual(result, expected)
      done()
    })
    test('convertHandler should correctly convert kg to lbs.', (done) => {
      const [number, unit] = [1, 'kg']
      const result = convertHandler.convert(number, unit)
      const expected = 2.20462

      assert.strictEqual(result, expected)
      done()
    })
  })
})
