const { Country, State, City } = require('country-state-city');

const CountryModel = require('../models/country');


const saveCountriesToDB = async () => {
    const countryCount = await CountryModel.countDocuments();
    if (countryCount > 0) {
        console.log("Countries already saved in database!");
        return;
    }
    const countries = Country.getAllCountries();
    const countryDoc = countries.map(country => ({
        name: country.name,
        short_name: country.isoCode,
    }));
    await CountryModel.insertMany(countryDoc);
    console.log('Countries saved to database!');
}


module.exports = saveCountriesToDB;



