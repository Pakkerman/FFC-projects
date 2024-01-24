'use strict'

const expect = require('chai').expect
const ConvertHandler = require('../controllers/convertHandler.js')

module.exports = function (app) {
  let convertHandler = new ConvertHandler()

  app.get('/api/convert', (req, res) => {
    // get number and unit
    const input = req.query.input
    const initNum = convertHandler.getNum(input)
    const initUnit = convertHandler.getUnit(input)
    if (!initNum && !initUnit) {
      res.json('invalid number and unit')
      return
    } else if (!initNum) {
      res.json('invalid number')
      return
    } else if (!initUnit) {
      res.json('invalid unit')
      return
    }

    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    )

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    })
  })
}
