
const express = require('express');
const bodyParser = require('body-parser'); // Parse form data
const nodemailer = require('nodemailer'); // For sending emails

const app = express();
const port = 4000;

// Middleware for parsing form data and serving static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); // Serve HTML files from the "public" folder

// Routes without middleware (to test all pages without restrictions)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html'); // Default home page
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html'); // Home page
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/public/services.html'); // Services page
});

app.get('/contactus', (req, res) => {
    res.sendFile(__dirname + '/public/contactus.html'); // Contact Us page
});

// POST Route: Handle form submission and send email
app.post('/send-email', (req, res) => {
    const { email, message } = req.body;
    res.sendFile(__dirname + '/public/contactus.html'); // Redirect back to the contact us page

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youssefjow033@gmail.com', // Your Gmail address
            pass: 'yrhp fqsh jikc btca'   // Your Gmail App Password
        }
    });

    const mailOptions = {
        from: 'youssefjow033@gmail.com', // Email input from form
        to: 'youssefjow033@gmail.com', // Your email to receive messages
        subject: 'New Contact Us Submission',
        text: `Message from: ${email}\n\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.send("<h1>Something went wrong. Email not sent.</h1>");
        } else {
            console.log('Email sent: ' + info.response);
            res.send("<h1>Email sent successfully! Thank you for contacting us.</h1>");
        }
    });
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});
