const cut = require('../lib/controllers/xmlbuilder')

// mock result from ES
const shapes = [
  {
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
  }
]

const feature = {
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
}

test('xml should be generated and contain some fields from inputs', () => {
  const result = cut.buildXML(feature, shapes)
  expect(result).toContain('FEATURE')
})