const search = require('./queryutils');
const con = require('../controllers/converters');
const xml = require('./xmlbuilder');


async function getXmlFromExternal(res, id) {
  try {
    const resp = await search.search(query('spatialfeatures', { id: id }));
    const coordinatesInTM35 = con.getTM35Coordinates(resp[0]._source.geometry.coordinates[0][0], con.transformProjection);
    const data = await search.getExternalData(coordinatesInTM35, res);
    res.contentType('application/xml');
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not reach one or more datasources' });
  }
}

async function getXml(res, id) {
  try {
    const spatialfeature = search.search(query('spatialfeatures', { id: id }));
    const pointset = search.search(query('shapes', { property: id }));
    const results = [await spatialfeature, await pointset];
    res.contentType('application/xml');
    res.send(xml.buildXML(results[0][0], results[1]));
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Could not reach one or more datasources' });
  }
}

// match term in form { attribute_to_match: attribute }
// indx = elasticsearch index
function query(indx, matchterm) {
  return {
    index: indx,
    body: {
      query: {
        match: matchterm
      },
      size: 100
    },
    type: '_doc'
  };
}

module.exports = {
  getXmlFromExternal,
  getXml
};


