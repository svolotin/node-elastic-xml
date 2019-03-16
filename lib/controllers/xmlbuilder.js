const builder = require('xmlbuilder');
const obj = require('../models/xmlobjects');

function buildXML(spatialfeature, shapes) {
  var xml = builder.create('SpatialUserData', {
    separateArrayItems: true
  })
    .dec('1.0', 'UTF-8')
    .att('xsi:schemaLocation', 'http://localhost:8080/geoserver/schemas/gml/3.1.1/base/gml.xsd')
    .att('xmlns', 'http://standardit.something.fi/schemas/spatialFeature')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .att('xmlns:gml', 'http://www.opengis.net/gml')
    .att('xmlns:gdt', 'http://standardit.something.fi/schemas/spatialFeature/common/geometricDataTypes')
    .ele(obj.spatialFeatures(spatialfeature._source, shapes))
    .end()
  console.log('XML created for feature: ', spatialfeature._id);
  console.log(xml)
  return xml
}

exports.buildXML = buildXML;

