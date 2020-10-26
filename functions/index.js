const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const nodeMailer = require('nodemailer');

admin.initializeApp();

exports.verifyRecaptcha = functions.https.onCall(async (data, context) => {
    const userToken = data.token;
    if (userToken === null || userToken === '' || userToken === undefined) {
        functions.logger.log('Token not found');
        throw new functions.https.HttpsError('invalid-argument', 'Token not found');
    } else if (data.reqBody.firstName === '' || data.reqBody.lastName === '' || data.reqBody.email === '' || data.reqBody.message === '' || typeof data.reqBody.firstName !== 'string' || typeof data.reqBody.lastName !== 'string' || typeof data.reqBody.email !== 'string' || typeof data.reqBody.message !== 'string') {
        functions.logger.log('Non-string input');
        throw new functions.https.HttpsError('invalid-argument', 'Content values not strings');
    }

    const secret = functions.config().recaptcha.secret;
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, undefined, {params: {secret, response: userToken}});
    const captchaRes = response.data;

    if (captchaRes.success) {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: functions.config().nodemailer.email,
                serviceClient: functions.config().nodemailer.clientid,
                privateKey: functions.config().nodemailer.privatekey.replace(/\\n/g, "\n")

            }
        });

        const mailOptions = {
            from: functions.config().nodemailer.email,
            to: functions.config().nodemailer.email,
            subject: `Contact Form Submission from ${data.reqBody.firstName} ${data.reqBody.lastName}`,
            text: `from: '${data.reqBody.firstName} ${data.reqBody.lastName}' ${data.reqBody.email}, message: ${data.reqBody.message}`,
            html: `<p>From: '${data.reqBody.firstName} ${data.reqBody.lastName}' ${data.reqBody.email}</p><p>Message: ${data.reqBody.message}</p>`
        };

        const errors = [];
        const message = data.reqBody;

        const mailed = await transporter.sendMail(mailOptions).catch(e => errors.push({'type': 'nodemailer error', 'returned error': e}));

        const saved = await admin.firestore().collection('contacts').add({...message, sent: admin.firestore.FieldValue.serverTimestamp()}).catch(e => errors.push({'type': 'firestore error', 'returned error': e}));

        if (mailed === undefined || saved === undefined) {
            functions.logger.log('At least one of send/save failed', {log: errors});
            throw new functions.https.HttpsError('unknown', 'Error sending/saving message', errors);
        } else {
            functions.logger.log('email sent and contact added');
            return { status: 'Success'};
        }
    } else {
        functions.logger.log('Recaptcha failed');
        throw new functions.https.HttpsError('unknown', 'Recaptcha failed', captchaRes['error-codes']);
    }
})
