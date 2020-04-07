
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var nodemailer = require('nodemailer');




const sendWelcomeEmail = (email,name)=>{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
      }
      });
      
    
    var mailOptions = {
        from: 'math.contact2071@gmail.com',
        to: email,
        subject: 'GEOLOGY EXAM',
        text: `HEllo . ITs me chris testing the app, let me know when you are ready to take the exam`      };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = {
    sendWelcomeEmail
}

//   user: 'oral.labadie@ethereal.email', // generated ethereal user//
//pass: 'qm92DrnbYY2htMd6RU'// generated ethereal password