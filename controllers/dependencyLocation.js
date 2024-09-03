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
    try {
        const { isoCode, countryCode } = req.query; // Get isoCode and countryCode from query parameters

        // Validate isoCode and countryCode
        if (!isoCode || !countryCode) {
            return res.status(400).send({ success: false, msg: 'isoCode and countryCode are required' });
        }

        // Fetch cities matching the isoCode and countryCode
        const cities = await City.find({ stateCode: isoCode, countryCode: countryCode });
        console.log("cities :", cities);

        // Check if any cities were found
        if (cities.length === 0) {
            return res.status(404).send({ success: false, msg: 'No cities found for the provided isoCode and countryCode' });
        }

        // Send response with cities data
        res.status(200).send({ success: true, msg: 'Cities data', data: cities });
    } catch (error) {
        console.error("Error fetching cities:", error); // Log the error
        res.status(400).send({ success: false, msg: error.message });
    }
}








module.exports = {
    getCountries,
    getStates,
    getCities,
}