const creativeDebugModel =  require('../models/creativeDebug');       
const creativeDebugUtilities = {};

const maxCreativeReturnLimit = 500;         // TODO: Hopefully we shouldn't pass this...

// Returns all creatives.
creativeDebugUtilities.getAllCreativeDebugObjects = () => {
    return creativeDebugModel.find({}, '-creative').limit(maxCreativeReturnLimit);
}

// Return creative given a UID
creativeDebugUtilities.retrieveCreativeDebugObjectsByUID = (uid) => {
    return creativeDebugModel.findById(uid);
}

// Create a new creative debug object
creativeDebugUtilities.createCreativeDebugObject = (obj) => {
    return creativeDebugModel(obj).save();
}

// Delete a creative given a UID
creativeDebugUtilities.deleteCreativeDebugObjectByUID = (uid) => {
    return creativeDebugModel.findByIdAndDelete(uid);
}

// Delete everything.
creativeDebugUtilities.deleteAllCreativeDebugObjects = (uid) => {
    return creativeDebugModel.deleteMany({});
}


/* Analysis specific queries */ 

// Aggregate on error code by advertiser
creativeDebugUtilities.aggregateErrorsOnAdvertiser = () => {
    return creativeDebugModel.aggregate(    [ 
        { 
            "$group":  { 
                "_id": "$errCode", 
                "adSystem": {$addToSet: "$adSystem"},
                "count": { "$sum": 1 } 
                
            } 
        }
    ],  )
}

creativeDebugUtilities.aggregateAdTitleByAdvertiser = () => {
    return creativeDebugModel.aggregate(    [ 
        { 
            "$group":  { 
                "_id": "$adTitle", 
                "adSystem": {$addToSet: "$adSystem"},
                "count": { "$sum": 1 } 
            } 
        }
    ],  )
}


creativeDebugUtilities.aggregateAdErrorsBySystemAndTitle = () => {
    return creativeDebugModel.aggregate([ 
        { 
            "$group":  { 
                "_id": "$errMessage", 
                "adSystem": {$addToSet: "$adSystem"},
                "adTitle": {$addToSet: "$adTitle"},
                "creative_id": {$addToSet: "$_id"},
                "count": { "$sum": 1 } 
            } 
        }
    ],  )
}



// Basic aggregation
/*
aggregateOnParam("adSystem")
*/
creativeDebugUtilities.aggregateOnParam = (param) => {
    if (param == undefined) {
        return;
    }
    return creativeDebugModel.aggregate(    [ 
        { "$group":  
            { "_id": "$" + param, 
              "count": { "$sum": 1 }
            } 
        }
    ],  )
}



module.exports = creativeDebugUtilities;                     