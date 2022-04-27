const mongoose = require('mongoose')
const Score = require('./models/score')

exports.handler = async (event, context) => {
    let { amount } = event.queryStringParameters

    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                results: await getScores(amount || 5)
            })
        }
    } catch (err) {
        console.log(err)
        return err
    }
}

async function getScores(amount) {
    const uri = `mongodb+srv://admin:${process.env.MDBAP}@cluster0.vwg22.mongodb.net/portfolio?retryWrites=true&w=majority`
    await mongoose.connect(uri)

    return await Score.find({}, 'name score -_id')
        .sort({ score: -1 })
        .limit(amount)
}
