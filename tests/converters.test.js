const cut = require('../lib/controllers/converters')

test('list of wgs84 coordinates should be transformed as a list of TM35 coordinates separated by space', () => {
  const coordinates = [[28.81051263510207, 62.32264551238281], [28.810389212227015, 62.322670252212596], [28.81037922258622, 62.32270911642245]]
  expect(cut.getTM35Coordinates(coordinates, cut.transformProjection)).toEqual(['593816.511799999 6911436.847799948', '593810.0403999992 6911439.424199952', '593809.4016999991 6911443.738199948'])
})

test('list of wgs84 coordinates should be transformed as a list of TM35 coordinates separated by comma', () => {
  const coordinates = [[28.81051263510207, 62.32264551238281], [28.810389212227015, 62.322670252212596], [28.81037922258622, 62.32270911642245]]
  expect(cut.getTM35Coordinates(coordinates, cut.transformProjectionXml)).toEqual(['593816.511799999,6911436.847799948', '593810.0403999992,6911439.424199952', '593809.4016999991,6911443.738199948'])
})

test('wgs84 coordinate should be transformed to TM35 coordinates separated by space', () => {
  const coordinate = [28.81051263510207, 62.32264551238281]
  expect(cut.transformProjection(coordinate)).toEqual('593816.511799999 6911436.847799948')
})

test('wgs84 coordinate should be transformed to TM35 coordinates separated by comma', () => {
  const coordinate = [28.81051263510207, 62.32264551238281]
  expect(cut.transformProjectionXml(coordinate)).toEqual('593816.511799999,6911436.847799948')
})

test('timestamp should be converted to date', () => {
  expect(cut.convertDate('20190823T120030Z')).toBe('2019-08-23')
})

test('UTC timestamp should be converted to ISO timestamp in local time', () => {
  expect(cut.convertToIsoDate('20190823T120030Z')).toBe('2019-08-23T15:00:30')
})

test('registered ids last two digits should be padded', () => {
  expect(cut.padDigits('636-458-1-222')).toBe('63645800010222')
})

test('registered ids last two digits should be padded. case one part already 4 chars', () => {
  expect(cut.padDigits('636-458-1111-2')).toBe('63645811110002')
})
