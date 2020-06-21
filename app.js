const express = require('express');
const app = express();
const http = require('http').createServer(app)
const port = process.env.PORT || 5000;
const db = require('./lib/db')

//Initialize DB
db();

// Initialize Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res)=> {
    res.json({Your:"#blacklivesmatter"})
})

//Define Routes

app.use('/api/users', require('./routes/users'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/auth', require('./routes/auth'))

http.listen(port, () => console.log(`Listening On Port ${port}`));
