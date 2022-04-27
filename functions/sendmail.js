const nodemailer = require('nodemailer')

exports.handler = async (event, context) => {
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: 'Hello World!' })
    // }
    let { name, email, message } = JSON.parse(event.body)

    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'lucas.larocco@gmail.com',
                pass: 'sew?Wiz3cut'
            }
        })

        const info = await transporter.sendMail({
            from: 'lucas.larocco@gmail.com',
            to: 'lucas.larocco@gmail.com',
            subject: `Sending with React, Nodemailer and Netlify`,
            html: `
            <h3>Email from ${name} ${email}<h3>
            <p>${message}<p>
            `
        })
    } catch (err) {
        return err
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            result: 'success'
        })
    }
}
