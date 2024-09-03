const mongoose = require('mongoose');


const citySchema = mongoose.Schema({
    name: { type: String, required: true },
    countryCode: { type: String, required: true },
    stateCode: { type: String, required: true }
})


const City = mongoose.model('City', citySchema);
module.exports = City;