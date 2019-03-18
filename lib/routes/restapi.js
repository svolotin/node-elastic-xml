const router = require('express').Router()
const dao = require('../controllers/dao')

router.get('/xml/external/:id', function (req, res) {
  dao.getXmlFromExternal(res, req.params.id)
})

router.get('/xml/elastic/:id', function (req, res) {
  dao.getXml(res, req.params.id)
})

module.exports = router
