import fetch from 'node-fetch'
import { Task } from './types'
const sgMail = require('@sendgrid/mail')

const sendEmail =  ({ url, email,name,msg }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const content = { 
    to: email,
    from: 'billmwas2@gmail.com',
    subject: `Studip Student Account Creation`,
    text: `Hey, ${name} confirm your studip account`,
    html: `<a href=${url}>${msg}</a>`
  }

  console.log(name,email)
  return Task((rej,res) => (
    sgMail.send(content)
    .then(result => res('Recruitment Email was sent successfully'))
    .catch(err => {
      console.log(err)
      return rej('Email not sent')})
  ))
}

export { sendEmail };