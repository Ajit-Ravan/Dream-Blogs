const Country = require("../models/country");
const State = require("../models/state");
const City = require("../models/city");


const getCountries = async (req, res) => {
    try {
        const countries = await Country.find({});
        res.status(200).send({ success: true, msg: 'countries data', data: countries });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const getStates = async (req, res) => {
    const { countryCode } = req.query; // Get countryCode from query parameters
    try {
        const states = await State.find({ countryCode: countryCode }); // Match by countryCode
        res.status(200).send({ success: true, msg: 'States data', data: states });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const getCities = async (req, res) => {
    const { stateCode } = req.params; // Get stateCode from the request parameters
    try {
        const cities = await City.find({ stateId: stateCode }); // Adjust the query to use stateCode
        res.status(200).send({ success: true, msg: 'cities data', data: cities });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}


module.exports = {
    getCountries,
    getStates,
    getCities,
}