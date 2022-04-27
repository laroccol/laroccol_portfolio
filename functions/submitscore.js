const mongoose = require('mongoose')
const Score = require('./models/score')

exports.handler = async (event, context) => {
    let { name, score } = JSON.parse(event.body)

    if (!name || !score) return { statusCode: 500 }

    try {
        await submitScore(name, score)
    } catch (err) {
        return { statusCode: 500 }
    }

    return {
        statusCode: 200
    }
}

async function submitScore(name, score) {
    const uri = `mongodb+srv://admin:${process.env.MDBAP}@cluster0.vwg22.mongodb.net/portfolio?retryWrites=true&w=majority`
    await mongoose.connect(uri)

    const newScore = Score({ name: name, score: score })
    newScore.save()
}
