var express = require('express');
var router = express.Router();
const creativeDebugUtils = require('../database/util_creativeDebug');

// Return a list of all the creatives logged thus far. (with a max limit enforced by the DB util
// TODO: Paginate or something
router.get('/', async (req, res, next) => {
  /* Note - this won't return the actual creative associated with the entry */

  try {
    var creatives = await creativeDebugUtils.getAllCreativeDebugObjects();
    if (creatives != null) {
      res.json(creatives);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err)
  }

})

// Return the creative
router.get('/creative/:id', async (req, res, next) => {
  try {
    var creative = await creativeDebugUtils.retrieveCreativeDebugObjectsByUID(req.params.id)
    if (creative != null) {
      res.json(creative);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
  
})

// Add something
router.post('/log/creative', async (req, res, next) => {

  try {
    const result = await creativeDebugUtils.createCreativeDebugObject(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }

});

// Wipe everything (but why, though)
router.delete('/donkey', async (req, res, next) => {
  try {
    const result = await creativeDebugUtils.deleteAllCreativeDebugObjects();
    res.status(204).json(result);
  } catch (err) {
    next(err)
  }
  
});

module.exports = router;
