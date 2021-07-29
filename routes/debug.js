var express = require('express');
var router = express.Router();
const creativeDebugUtils = require('../database/util_creativeDebug');

// Return a list of all the creatives logged thus far. (with a max limit enforced by the DB util
// TODO: Paginate or something
router.get('/', async (req, res, next) => {
  var creatives = await creativeDebugUtils.getAllCreativeDebugObjects();
  res.json(creatives);
})

// Add something
router.post('/log/creative', async (req, res, next) => {
  const result = await creativeDebugUtils.createCreativeDebugObject(req.body);
  res.status(201).json(result);
});

// Wipe everything (but why, though)
router.delete('/donkey', async (req, res, next) => {
  const result = await creativeDebugUtils.deleteAllCreativeDebugObjects();
  res.status(204).json(result);
});


/* reporting routes */
router.get('/report', async (req, res, next) => {
  const result = await creativeDebugUtils.aggregateOnAdSystem();
  res.json(result);
})

module.exports = router;
