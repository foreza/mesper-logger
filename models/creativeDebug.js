var mongoose = require('mongoose');         // Use mongoose
var Schema = mongoose.Schema;

/* Sample schema from FE */
// var reqBody = {
//     "adSystem": debugAdMeta.system,
//     "adTitle": debugAdMeta.textContent,
//     "timestamp": Date.now(),
//     "creative": creative,
//     "errCode": errCode != undefined ? errCode : "[none]",
//     "errMessage": errMessage != undefined ? errMessage : "No message specified"
// };


const CreativeDebug = Schema({
    _id: {
        type: mongoose.Types.ObjectId, auto: true
    },
    adSystem: { type: String },
    adTitle: { type: String },
    timestamp: { type: Date },
    creative: { type: String },
    errCode: { type: Number },
    errMessage: { type: String },
    versionKey: false 
    }
);

// Export the module
module.exports = mongoose.model('CreativeDebug', CreativeDebug);