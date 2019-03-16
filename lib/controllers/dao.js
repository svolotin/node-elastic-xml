const elasticsearch = require('elasticsearch')
const con = require('../controllers/converters')
const axios = require("axios")
const xml = require('./xmlbuilder')
const elasticUrl = process.env.ELASTIC_URL
const externalUrl = process.env.EXTERNAL_DATASOURCE_URL
const client = new elasticsearch.Client({
  host: elasticUrl,
  log: 'info'
});

async function search(query) {
  try {
    const response = await client.search(query)
    return response.hits.hits
  } catch (err) {
    console.error(err)
  }
}

async function getXmlFromExternal(res, id) {
  try {
    const resp = await search(query('properties', { id: id }))
    const coordinatesInTM35 = con.getTM35Coordinates(resp[0]._source.geometry.coordinates[0][0], con.transformProjection)
    const data = await getExternalData(coordinatesInTM35, res)
    res.contentType('application/xml')
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: 'Could not reach one or more datasources' });
  }
}

async function getXml(res, id) {
  try {
    const spatialfeature = search(query('properties', { id: id }))
    const pointset = search(query('compartments', { property: id }))
    const results = [await spatialfeature, await pointset]
    res.contentType('application/xml')
    res.send(xml.buildXML(results[0][0], results[1]))
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: 'Could not reach one or more datasources' });
  }
}

async function getExternalData(coordinates) {
  const payload = 'wktPolygon=POLYGON ((' + coordinates + '))&stdVersion=MV1.7'
  try {
    const response = await axios.post(externalUrl, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

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
  }
}

module.exports = {
  getXmlFromExternal,
  getXml
}


