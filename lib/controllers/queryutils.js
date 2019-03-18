const elasticsearch = require('elasticsearch')
const axios = require('axios')
const elasticUrl = process.env.ELASTIC_URL
const externalUrl = process.env.EXTERNAL_DATASOURCE_URL
const client = new elasticsearch.Client({
  host: elasticUrl,
  log: 'info'
})

async function search(query) {
  try {
    const response = await client.search(query)
    return response.hits.hits
  } catch (err) {
    return err
  }
}

async function getExternalData(coordinates) {
  const payload = 'wktPolygon=POLYGON ((' + coordinates + '))&stdVersion=MV1.7'
  try {
    const response = await axios.post(externalUrl, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

module.exports = {
  search,
  getExternalData
}
