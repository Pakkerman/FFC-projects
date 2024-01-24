function splitInput(input) {
  const number = input.match(/[.\d\/]+/g) || ['1']
  const unit = input.match(/[A-Za-z]+/g)

  return [number[0], unit?.[0]]
}

function splitFractionInput(input) {
  const out = input.split('/')
  if (2 < out.length) return false

  return out
}

function ConvertHandler() {
  this.getNum = function (input) {
    input = splitInput(input)[0]
    const fraction = splitFractionInput(input)

    let a = fraction[0]
    let b = fraction[1] || 1

    if (isNaN(a) || isNaN(b)) return undefined

    return a / b
  }

  this.getUnit = function (input) {
    input = splitInput(input)[1].toLowerCase()

    switch (input) {
      case 'gal':
        return 'gal'
      case 'l':
        return 'L'
      case 'km':
        return 'km'
      case 'mi':
        return 'mi'
      case 'lbs':
        return 'lbs'
      case 'kg':
        return 'kg'
      default:
        return undefined
    }
  }

  this.getReturnUnit = function (initUnit) {
    initUnit = initUnit.toLowerCase()
    switch (initUnit) {
      case 'gal':
        return 'L'
      case 'l':
        return 'gal'
      case 'km':
        return 'mi'
      case 'mi':
        return 'km'
      case 'lbs':
        return 'kg'
      case 'kg':
        return 'lbs'
      default:
        return undefined
    }
  }

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case 'gal':
        return 'gallons'
      case 'l':
        return 'liters'
      case 'km':
        return 'kilometers'
      case 'mi':
        return 'miles'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'
      default:
        return undefined
    }
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934

    switch (initUnit.toLowerCase()) {
      case 'gal':
        return +(initNum * galToL).toFixed(5)
      case 'l':
        return +(initNum / galToL).toFixed(5)
      case 'lbs':
        return +(initNum * lbsToKg).toFixed(5)
      case 'kg':
        return +(initNum / lbsToKg).toFixed(5)
      case 'mi':
        return +(initNum * miToKm).toFixed(5)
      case 'km':
        return +(initNum / miToKm).toFixed(5)
      default:
        return undefined
    }
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  }
}

module.exports = ConvertHandler
