import nodemailer from "nodemailer"

let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user:  'ak8911938@gmail.com', 
		pass: 'BOOKINGTEST123'
	} 
});

export let sendEmail= async (to:string,subject:string,html:string )=>{
console.debug("send email run")
    /**
     * to reciver email
     * subject email title
     * html message body
     * 
     * 
     * 
     */

  let mailDetails = { 
    from: process.env.emailAddress, 
    to, 
    subject , 
    html
  }; 
  
 const result =await mailTransporter.sendMail(mailDetails)
 console.debug('email send run ',result)
 return result
    
  


}





