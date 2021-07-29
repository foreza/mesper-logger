const creativeDebugModel =  require('../models/creativeDebug');       
const creativeDebugUtilities = {};

const maxCreativeReturnLimit = 500;         // TODO: Hopefully we shouldn't pass this...

// Returns all creatives.
creativeDebugUtilities.getAllCreativeDebugObjects = () => {
    return creativeDebugModel.find().limit(maxCreativeReturnLimit);
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

// Aggregate on different advertisers
creativeDebugUtilities.aggregateOnAdSystem = () => {
    return creativeDebugModel.aggregate(    [ 
        { "$group":  { "_id": "$adSystem", "count": { "$sum": 1 } } }
    ],  )
}



module.exports = creativeDebugUtilities;                     