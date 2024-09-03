const { Country, State, City } = require('country-state-city');

const CityModel = require('../models/city');

const saveCitiesToDB = async () => {
    // Check if cities already exist
    const cityCount = await CityModel.countDocuments();

    if (cityCount > 0) {
        console.log("Cities already saved in database!");
        return;
    }
    const cities = City.getAllCities();
    const cityDoc = cities.map(city => ({
        name: city.name,
        countryCode: city.countryCode, // Include countryCode
        stateCode: city.stateCode,
    }));

    await CityModel.insertMany(cityDoc);
    console.log("Cities saved to database!");
};

module.exports = saveCitiesToDB;
