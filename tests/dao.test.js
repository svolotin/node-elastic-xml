const cut = require('../lib/controllers/dao')
const MockExpressResponse = require('mock-express-response')
const query = require('../lib/controllers/queryutils')

const response = new MockExpressResponse()
const response2 = new MockExpressResponse()
jest.mock('../lib/controllers/queryutils')

const mockQueryDefaultCall = [{
  "_index": "feature",
  "_type": "_doc",
  "_id": "636",
  "_score": 3.7216692,
  "_source": {
    "events": 29,
    "area": 28341.612385481123,
    "created": "20181008T075135Z",
    "type": "https://some.url.com/events/type/visit",
    "geometry": { "coordinates": [[[[22.366103072838264, 60.8484815944191], [22.36345035329317, 60.84980532089887]]]], "type": "MultiPolygon" },
    "id": "636",
    "shape": "636"
  }
}]

const mockQueryFirstCall = [{
  "_index": "spatialfeature",
  "_type": "_doc",
  "_id": "458",
  "_score": 1.5404451,
  "_source": {
    "area": 332780,
    "country": "fi",
    "created": "20181227T095706Z",
    "geometry": { "coordinates": [[[[22.36789594439298, 60.854454332665114], [22.363890174366674, 60.85611223541317]]]], "type": "multipolygon" },
    "id": "458",
    "identifier": "458",
    "users": [
      "some@some.com"
    ],
    "title": "FEATURE",
    "visitors": 201
  }
}]

const mockExternalCall = '<?xml version="1.0" encoding="UTF-8"?><SpatialUserData'

test('Should generate xml from elasticsearch results', async () => {
  const mockFunc = query.search.mockImplementation(() => mockQueryDefaultCall)
  mockFunc.mockImplementationOnce(() => mockQueryFirstCall)
  await cut.getXml(response, 'test')
  expect(response._responseData.toString('utf8')).toContain('FEATURE')
})

test('Should get coordinates from elasticsearch and invoke query to external datasouce', async () => {
  query.search.mockImplementation(() => mockQueryDefaultCall)
  query.getExternalData.mockImplementation(() => mockExternalCall)
  await cut.getXmlFromExternal(response2, 'test')
  expect(response._responseData.toString('utf8')).toContain('SpatialUserData')
})