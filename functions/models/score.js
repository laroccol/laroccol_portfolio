const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number
})

module.exports =
    mongoose.models.leaderboard || mongoose.model('leaderboard', scoreSchema)
