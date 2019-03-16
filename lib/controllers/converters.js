const moment = require('moment')
const proj4 = require("proj4")
proj4.defs("EPSG:3067", "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs")

function getTM35Coordinates(coordinates, transformFunc) {
  return coordinates.map(x => transformFunc(x))
}

// From WGS84 to TM35
function transformProjection(x) {
  var source = new proj4.Proj('WGS84');
  var dest = new proj4.Proj('EPSG:3067');
  var result = proj4.transform(source, dest, x)
  return result.x + ' ' + result.y;
}

// From WGS84 to TM35 comma separated
function transformProjectionXml(x) {
  var source = new proj4.Proj('WGS84');
  var dest = new proj4.Proj('EPSG:3067');
  var result = proj4.transform(source, dest, x)
  return result.x + ',' + result.y;
}

function convertDate(d) {
  return moment(d, 'YYYYMMDDTHHmmssZ').format('YYYY-MM-DD')
}

function convertToIsoDate(d) {
  return moment(d, 'YYYYMMDDTHHmmssZ').format('YYYY-MM-DDTHH:mm:ss')
}

function padDigits(digits) {
  const numbers = digits.split('-')
  return numbers[0] + numbers[1] + numbers[2].padStart(4, '0') + numbers[3].padStart(4, '0')
}

module.exports = {
  getTM35Coordinates,
  transformProjection,
  transformProjectionXml,
  proj4,
  convertDate,
  convertToIsoDate,
  moment,
  padDigits
}
