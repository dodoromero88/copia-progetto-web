// importiamo il modulo nodemailer per inviare una email di contatto
const fs = require("fs");
const nodemailer = require("nodemailer");
const config = JSON.parse(fs.readFileSync("config.json"));  //Per lettura config.json

module.exports = {
    sendContactMail:function(req,res) {
        let transport = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 25,
            auth: {
                user :'dodo.romero1988@gmail.com',
                pass : config.password
            },
            tls: {
                rejectUnauthorized: false
            }

        });

        //Sfrutto una  email temp ( che sarà quella della WEB app), che manda una email
        // di contatto/info prendendo i dati dalla view info.ejs e le invia all'amministratore 
        var mailOp = {
            from:'Web app prova Althea beauty - <dodo.romero1988@gmail.com>',
            to: 'eduardo.romero@studenti.unicam.it',
            subject: 'Contact from App Althea beauty ',
            //Text
            text:'You have a new message from Althea beauty- User' + req.body.name +'\n' + 'Email:' +req.body.email +'\n'+ 'Subject:' + req.body.subject +'\n'+ 'Message:' +req.body.message,
            html:'<h3> You have anew message!</h3> <br/> <ul><li>From: ' + req.body.name +'@Althea beauty</li><li>' + 'Email:'+req.body.email+'</li><li> <p>' + req.body.message + '</p></li></ul>'
        };

        transport.sendMail(mailOp,(error,info) =>{
            if(error){
                
            
                console.log('email could not be sent! \n'+ error);
                res.render('error',{
                    title : 'Error',
                    message : `Ops c'è stato un problema! ${error.message}` 
                    
                });
                
                
            }else{
                console.log('Message sent succesfully!\n'+ info.response);

                res.render('message',{
                    
                    title: 'Message',
                    message: 'verification sent, check yuor email!!',
                    mailOp_from: mailOp.from,
                    mailOp_to: mailOp.to,
                    mailOp_subject: mailOp.subject,
                    mailOp_text: mailOp.text
                    
                });

                
            }
        })
    }

}