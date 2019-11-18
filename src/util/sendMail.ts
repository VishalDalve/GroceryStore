import * as nodemailer from 'nodemailer';
import { default as config } from '../env/index';

class Mailer {

    public sendMail (reciepent, subject, data) {
        var transporter = nodemailer.createTransport(
            config.envConfig.emailCredentials
           );

           let mailOptions:any;

        //Condition for superAdmin ---------   
        if(data.password){

           mailOptions = {
            from: 'rajat.singhal@mail.vinove.com', // sender address
            to: reciepent, // list of receivers
            subject: subject , 
            html: `<p>Hi ${data.email}, Welcome to Hotbot.</p><p><a href=${data.url} target=_blank>Click here to Verify</a></p><p>Your Password : ${data.password}</p>`
          };

        }
        else if(subject == "Reset password"){

          mailOptions = {
            from: 'rajat.singhal@mail.vinove.com', // sender address
            to: reciepent, // list of receivers
            subject: subject , 
            html: `<p>Hi ${data.email}, Welcome to Hotbot.</p><p><a href=${data.url} target=_blank>Click here to Reset password</a></p>`
          };

        }
        else{

          mailOptions = {
            from: 'rajat.singhal@mail.vinove.com', // sender address
            to: reciepent, // list of receivers
            subject: subject , 
            html: `<p>Hi ${data.email}, Welcome to Hotbot.</p><p><a href=${data.url} target=_blank>Click here to Verify</a></p>`
          };

        }

          transporter.sendMail(mailOptions, function (err, info) {
            if(err){
              console.log(err)
              return 0
            }
            else{
              console.log(info);
              return 1
            }
         });
    }
}

export default new Mailer(); 