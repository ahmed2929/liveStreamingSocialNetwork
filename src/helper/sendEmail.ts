import nodemailer from "nodemailer"

let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user:  'ahmed2013zx2013@gmail.com', 
		pass: '3636487!a'
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
    from:'ahmed2013zx2013@gmail.com', 
    to, 
    subject , 
    html
  }; 
  console.debug("mail details is ",mailDetails)
 const result =await mailTransporter.sendMail(mailDetails)

   console.debug('email is sent',result);
 
 return result
    
  


}





