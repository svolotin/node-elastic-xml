const con = require('../controllers/converters')

function spatialFeatures(spatialfeature, shapes) {
  return {
    'sf:SpatialFeatures': {
      'sf:SpatialFeature': spatialFeature(spatialfeature, shapes)
    }
  }
}

function spatialFeature(spatialfeature, shapes) {
  return {
    '@id': 1,
    'sf:Name': spatialfeature.title,
    'sf:Users': handleArray(spatialfeature.users, user),
    'sf:Shapes': payload(shapes)
  }
}

function user(user) {
  return {
    'sf:SpatialFeatureUser': {
      '@id': 1,
      'ci:EmailAddress': user
    }
  }
}

function payload(shapes) {
  return {
    'pl:Payload': {
      '@id': 1,
      'pl:PayloadNumber': 1,
      'pl:Shapes': handleArray(shapes, shape)
    }
  }
}

function shape(shape) {
  return {
    'pl:Shape': {
      '@id': shape._source.id,
      'pl:Events': shape._source.events,
      'pl:Area': shape._source.area,
      'pl:Created': con.convertDate(shape._source.created),
      'pl:Type': shape._source.type
    }
  }
}

// --- helper functions -----------

function handleArray(array, modelfunc) {
  return array.map(x => modelfunc(x));
}

exports.spatialFeatures = spatialFeatures


