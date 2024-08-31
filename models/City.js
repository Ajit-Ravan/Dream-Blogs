const mongoose = require('mongoose');


const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
})


const City = mongoose.model('City', citySchema);
module.exports = City;