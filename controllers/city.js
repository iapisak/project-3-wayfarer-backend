const db= require('../models')

const allCities = (req, res) => {
    db.City.find({}, (err, foundCity) => {
        if (err) { return res.status(500).json({ error: "Could not find Cities" }) }
        res.json({ status: 200, data: foundCity,})
    })
}

module.exports = {
    allCities,
}