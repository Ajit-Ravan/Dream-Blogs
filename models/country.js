const mongoose = require('mongoose');


const countrySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    short_name: {
        type: String,
        required: true,
    },
})


const Country = mongoose.model('Country', countrySchema);
module.exports = Country;