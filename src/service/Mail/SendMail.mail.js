const nodemailer = require("nodemailer");
const Mail = require("./Mail.js");

class SendMail {
    subject = String;
    mail = String;
    message = String;
    from = String;
    constructor(from,subject,mail,message){
        this.from = from;
        this.subject = subject;
        this.mail = mail;
        this.message = message;
        
    }
   async init(){
    try {
    const Transport = nodemailer.createTransport(Mail)
      let optionObject ={
          from: this.from,
          to: this.mail,
          subject: this.message
      }
      const Send = await Transport.sendMail(optionObject)
      if(Send){
        return true;
      }
    } catch {
          return false;    
    }
}
    
}

module.exports = SendMail