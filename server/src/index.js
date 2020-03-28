const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

const port = process.env.PORT || 1337;

const uri = process.env.DATABASE_URL;

mongoose.connect(uri, {
    useCreateIndex:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then( () => {
        console.log("Connected To Mongo Db DataBase");
    }).catch((err) => {
    console.log("DataBase Connection Error " + err);
})

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json()); //to parse the body of the request message


app.get('/', (req,res) => {
    res.json({
        message : 'Hello World!',
    });
});

app.use('/api/logs',logs);

//comes to this middleware if the requested url is not found
app.use(middlewares.notFound);

//error handling middleware (general, so may not just be 404)
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})
