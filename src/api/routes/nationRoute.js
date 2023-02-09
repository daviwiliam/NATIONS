const express = require('express')
const NationController = require('../controller/NationController')
const router = express.Router()


router.get('/:nome', NationController.getNationData)

module.exports = router

