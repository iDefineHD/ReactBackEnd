const express = require('express');
const app = express();
const http = require('http').createServer(app)
const port = process.env.PORT || 5000;
const path = require('path')
const db = require('./lib/db')

//Initialize DB
db();

// Initialize Middleware
app.use(express.json({ extended: false }))


//Define Routes

app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

// Serve Static Assets In Production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

http.listen(port, () => console.log(`Listening On Port ${port}`));
