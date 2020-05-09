const express = require('express')
const connectDB = require('./config/db')

const app = express();
connectDB();

// Routes
app.get('/api/users', require('./routes/api/users'))
app.get('/api/auth', require('./routes/api/auth'))
app.get('/api/profile', require('./routes/api/profile'))
app.get('/api/posts', require('./routes/api/posts'))


const PORT = process.env.PORT || 5000;

app.listen(PORT)