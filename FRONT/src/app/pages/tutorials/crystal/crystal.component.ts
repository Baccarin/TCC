import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorials',
  templateUrl: './crystal.component.html',
  styleUrls: ['./crystal.component.scss']
})
export class CrystalComponent implements OnInit {

  code:string = `
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const sendMail = require('./sendmail');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//SendMail
app.post("/sendmail", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        sendMail(name, email, phone, message)
        return res.json({ ok: 'Send successful!' })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.listen(3001, () => {
  console.info('Listen in http://localhost:3001')
})
  `;

  send:string = `
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (name, email, phone, message) => {

    var html =
    "<br>" +
    "<br>" +
      "<b>Name:</b> " +
      name +
      "<br>" +
      "<br>" +
      "<b>Email:</b> " +
      email +
      "<br>" +
      "<br>" +
      "<b>Phone:</b> " +
      phone +
      "<br>" +
      "<br>" +
      "<b>Message:</b> " +
      message +
      "<br>"+
      "<br>";


    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "YOURACCOUNT@gmail.com",
          pass: process.env.PASSWORD_GMAIL
        }
      });
 

    var message = {
        from: "YOURACCOUNT@gmail.com",
        to: email,
        subject: "Message",
        html: html,
    };

    transport.sendMail(message, function (err) {
        if (err) {
            console.log(err)
            return;
        } else {
            console.log('sucefull in send email for: ' + email);
        }
    });
};

module.exports = sendMail;

  `

  en:string = `
    PASSWORD_GMAIL=YOURPASSWORDGMAIL
  `


  constructor() { }

  ngOnInit(): void {
  }

}
