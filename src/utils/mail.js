import Mailgen from "mailgen";
import nodemailer from "nodemailer";
const sendEmail=async(options)=>{
    const MailGenerator=new mailgen({
        theme:"default",
        product:{
            name:"Project management app",
            link: "http://localhost:8000/",
        }
    })
};
const emailtextual=mailGenerator.generatePlaintext(options.mailGenContent);
const emailhtml=mailGenerator.generate(options.mailGenContent);
const transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASSWORD,
    },
})
  const mail = await transporter.sendMail({
    from:"waliasheetal206@gmail.com",
    to:options.email,
    subject: options.subject,
    text: emailtextual, 
    html:emailhtml,
  })
try{
    await transporter.sendEMail(mail)
}
catch (err) {
  console.error("Email service failed silently.Make sure that you have provided your MAILTRAP cedentials in the .env file")
  console.error("Error:",error)
}
const EmailVerificationGenertorMailGen =(username,verificationURL)=>{
    return{
        body:{
            name:username,
            intro:"welcome to ourr App!we're very excited to have you on board",
            action:{
                instructions:"To get strated with our app click here",
                button:{
                    color:"#22BC66",
                    text:"verify your email",
                    link:verificationURL,
                },
            },
            outer:
                'Need help, or have questions? Just reply to this email, we\'d love to help.',
        },
        };
    };
    const ForgotPasswordMailGen=(username,passwordresetURL)=>{
        return{
            body:{
                name:username,
                intro:"we have got a request to change your account password",
                action:{
                    instructions:"To reset your accounts password click on the following link",
                    button:{
                        color:"#DC4D2F",
                        text:"Reset your password",
                        link:passwordresetURL,
                    },
                },
                outer:"Need help,or have questions?Just reply to this email,we'd love to help.",
                    },
                };
            };
            export{
                EmailVerificationGenertorMailGen,
                ForgotPasswordMailGen,sendEmail
            };
        
