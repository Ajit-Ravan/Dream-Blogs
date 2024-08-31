const mongoose = require('mongoose');


const stateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    countryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Country',
        required: true,
    },
})


const State = mongoose.model('State', stateSchema);
module.exports = State;