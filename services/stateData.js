const { State } = require('country-state-city');
const StateModel = require('../models/State');

const saveStatesToDB = async () => {
    // Check if states already exist
    const stateCount = await StateModel.countDocuments();
    if (stateCount > 0) {
        console.log("States already saved in database!");
        return;
    }
    const states = State.getAllStates();
    const stateDoc = states.map(state => ({
        name: state.name,
        countryCode: state.countryCode,
    }));

    await StateModel.insertMany(stateDoc);
    console.log("States saved to database!");
};

module.exports = saveStatesToDB;
