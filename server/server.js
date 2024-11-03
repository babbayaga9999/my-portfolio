// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS,   // Your application-specific password
  },
});

// POST route for sending email
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Mail options
  const mailOptions = {
    from: email, // Sender's email
    to: process.env.EMAIL_USER, // Your email address to receive messages
    subject: `New message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send('Message sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:5000`);
});
