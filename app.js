const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', true);
require('dotenv/config');

app.use(bodyParser.json());

//Import Routes 
const postsRoute = require('./routes/posts');

app.use('/api/items', postsRoute);


//Connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () =>
        console.log('DB connected')
);

//listinf to the server
app.listen(3000);