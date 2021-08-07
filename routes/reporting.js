var express = require('express');
var router = express.Router();
const creativeDebugUtils = require('../database/util_creativeDebug');

router.get('/', async (req, res, next) => {

    // Primitive queries
    const adSystemAggregate = await creativeDebugUtils.aggregateOnParam("adSystem");

    // Advanced queries
    const errCodeAggregate = await creativeDebugUtils.aggregateErrorsOnAdvertiser();
    const adTitleAggregateByAdvertiser = await creativeDebugUtils.aggregateAdTitleByAdvertiser();

    // Main error source query - enable this once mongo is running a later version
    // var creativeDebugUrl = req.protocol + '://' + req.get('host') + "/debug/creative/";
    // const errCodeAdvAggregate = await creativeDebugUtils.aggregateAdErrorsBySystemAndTitleWithBaseURL(creativeDebugUrl);
    errCodeAdvAggregate = await creativeDebugUtils.aggregateAdErrorsBySystemAndTitle();

    res.json({
        adSystemBreakdown: adSystemAggregate,
        adErrorDetailedBreakdown: errCodeAdvAggregate,
        errCodeBreakdown: errCodeAggregate,
        adTitleByAdvertiser: adTitleAggregateByAdvertiser
    });

});



module.exports = router;
