const nodemailer = require('nodemailer')

exports.handler = async (event, context, callback) => {
    let data = JSON.parse(event.body)
    console.log(data)

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'lucas.larocco@gmail.com',
            pass: 'sew?Wiz3cut'
        }
    })

    transporter.sendMail(
        {
            from: 'lucas.larocco@gmail.com',
            to: 'lucas.larocco@gmail.com',
            subject: `Sending with React, Nodemailer and Netlify`,
            html: `
            <h3>Email from ${data.name} ${data.email}<h3>
            <p>${data.message}<p>
            `
        },
        function (error, info) {
            if (error) {
                callback(error)
            } else {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({
                        result: 'success'
                    })
                })
            }
        }
    )
}
