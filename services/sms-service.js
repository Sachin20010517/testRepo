// const twilio = require('twilio');

// const client = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );

// async function sendSms(body) {
//     try {
//         // Assuming `cNumber` is the phone number in the request body
//         let cNumber = body.customer.cNumber;
//         if (!cNumber.startsWith('+')) {
//             cNumber = `+94${cNumber}`; // Assuming Sri Lanka country code is +94
//         }

//         // Send SMS using Twilio
//         const message = await client.messages.create({
//             body: `Hello Mr/Mrs ${body.customer.cName} , your order has been placed under Order No : ${body.order_No}`, // Enter your message
//             from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
//             to: cNumber // Recipient's phone number
//         });

//         console.log('SMS sent:', message.sid);
//         return { status: 200, message: 'SMS sent successfully' };
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         return { status: 500, error: 'Failed to send SMS' };
//     }
// }
// module.exports = {
//     sendSms,
// }