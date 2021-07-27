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

module.exports = creativeDebugUtilities;                     