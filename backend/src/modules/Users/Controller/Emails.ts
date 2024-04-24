import moment from "moment";
import Mailjet from "node-mailjet"
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
  apiSecret: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret'
});
const appName = process.env.APP_NAME
const appColor = '#000';

const sendEmail = (emailDetails) => {

  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: "noreply@llamanodes.net",
            Name: `${appName} Team`
          },
          To: [
            {
              Email: emailDetails.email,
              Name: emailDetails?.fullName || ''
            }
          ],
          Subject: emailDetails?.subject,
          // TextPart: "",
          HTMLPart: emailDetails.html
        }
      ]
    })

  request
    .then((result) => {
      console.log(result.body,'--bold')
    })
    .catch((err) => {
      console.log(err,'-----')
    })
}


export const welcomeEmailNotification = (userD) => {

  sendEmail({
    ...userD,
    subject: `Welcome to ${appName}`,
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: ${appColor};text-decoration:none;font-weight:600">${appName}</a>
      </div>
      <p style="font-size:1.1em">Hello, ${userD?.fullName}</p>
      <p>Congratulations! Your individual registration with ${appName} is confirmed!</p>
      <p>If you have any queries or concerns, feel free to contact us at support@${appName}.com.</p>
      <p style="font-size:0.9em;">Thank you,<br>Team ${appName}</p>
      <br>
    </div>
  </div>`
  })

}


export const signupVerificationNotification = (userD, otp) => {

  sendEmail({
    ...userD,
    subject: 'Email verification OTP',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: ${appColor};text-decoration:none;font-weight:600">${appName}</a>
      </div>
      <p style="font-size:1.1em">Hi, ${userD?.fullName}</p>
      <p>A request has been received to create the account for ${appName}.</p>
      <h2 style="background: ${appColor};margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">If you did not initiate this request, please contact us immediately at support@${appName}.com .</p>
      <p style="font-size:0.9em;">Thank you,<br>Team ${appName}</p>
      <br>
    </div>
  </div>`
  })
}

export const updateProfileVerificationNotification = (userD, otp) => {

  sendEmail({
    ...userD,
    subject: 'Update profile verification OTP',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: ${appColor};text-decoration:none;font-weight:600">${appName}</a>
      </div>
      <p style="font-size:1.1em">Hi, ${userD?.fullName}</p>
      <p>A request has been received to update the account for ${appName}.</p>
      <h2 style="background: ${appColor};margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">If you did not initiate this request, please contact us immediately at support@${appName}.com .</p>
      <p style="font-size:0.9em;">Thank you,<br>Team ${appName}</p>
      <br>
    </div>
  </div>`
  })
}
export const forgotPasswordNotification = (userD, otp) => {

  sendEmail({
    ...userD,
    subject: 'Forgot password',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: ${appColor};text-decoration:none;font-weight:600">${appName}</a>
      </div>
      <p style="font-size:1.1em">Hi, ${userD?.fullName}</p>
      <p>Forgot your password?</p>
      <p>A request has been received to change the password for your ${appName} account.</p>
      <h2 style="background: ${appColor};margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">If you did not initiate this request, please contact us immediately at support@${appName}.com .</p>
      <p style="font-size:0.9em;">Thank you,<br>Team ${appName}</p>
      <br>
    </div>
  </div>`
  })
}
export const orderPlacedNotification = (userD, orderDetails) => {
  let selectedCourse = []
  for (let i of orderDetails?.classes) {
    let selectedDate = []
    for (let y of i.dates) {
      selectedDate.push(moment(y.date).format("Do MMM YYYY"))
    }
    selectedCourse.push(`<li>Training Details: ${i.courseName}</li> <li>When: ${selectedDate.join(', ')}</li> <li>Quantity: ${i.quantity}</li>`)
  }

  sendEmail({
    ...userD,
    subject: 'Training Details',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: ${appColor};text-decoration:none;font-weight:600">Mindbel</a>
      </div>
      <p style="font-size:1.1em">Hello, ${userD?.firstName}</p>
      <p>Congratulations! Your training is registered and below are the details.</p>
        <ul>
            ${selectedCourse.join(' ')}
        </ul>
        <p style="font-size:0.9em;">Webinar details will be shared very soon. Make sure you don't share the link publicly because this is unique for you.</p>
        <p style="font-size:0.9em;">If you have any queries or concerns, feel free to contact us at support@Mindbel.com.</p>
        <p style="font-size:0.9em;">Thank you,<br>Team Mindbel</p>
        <br>
        <p style="font-size:0.9em;text-align:center">HURRY UP! CHECK FOR THE <a href="https://mindbelweb.teck-solutions.com/in/courses">COURSES</a> &amp; <a href="https://mindbelweb.teck-solutions.com/in/offers">AVAIL OFFERS</a></p>
    </div>
  </div>`
  })

}

export const paymentConfirmationNotification = (userD, orderDetails) => {
  let selectedCourse = []
  let selectedDate = []
  for (let i of orderDetails?.classes) {
    selectedCourse.push(i.courseName)
    for (let y of i.dates) {
      selectedDate.push(moment(y.date).format("Do MMM YYYY"))
    }
  }
  sendEmail({
    ...userD,
    subject: 'Payment Confitmation',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: ${appColor};text-decoration:none;font-weight:600">Mindbel</a>
      </div>
      <p style="font-size:1.1em">Hello, ${userD?.firstName}</p>
      <p style="font-size:0.9em;">This is to acknowledge that we have received the payment of ${orderDetails?.currency} ${orderDetails?.grandTotal} against your training courses ${selectedCourse.join(', ')} on ${selectedDate.join(', ')}.</p>
        
        <p style="font-size:0.9em;">Thanks for remitting the payment on the right time.</p>
        <p style="font-size:0.9em;">If you have any queries or concerns, feel free to contact us at support@Mindbel.com</p>
        <p style="font-size:0.9em;">Thank you,<br>Team Mindbel</p>
        <br>
        <p style="font-size:0.9em;text-align:center">HURRY UP! CHECK FOR THE <a href="https://mindbelweb.teck-solutions.com/in/courses">COURSES</a> &amp; <a href="https://mindbelweb.teck-solutions.com/in/offers">AVAIL OFFERS</a></p>
    </div>
  </div>`
  })

}