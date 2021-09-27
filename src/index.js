const express = require('express');
const cors = require ('cors');

const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api',require('./endpoints/index'));

const  port= process.env.PORT || 5000;

app.listen(port);
console.log('Server on port', port);