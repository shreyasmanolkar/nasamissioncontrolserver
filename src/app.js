const express = require('express');
const path = require('path');

const api = require('./routes/api');

const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors({
    // origin: 'http://localhost:3000',
    // origin: "https://nasamisssioncontrol.herokuapp.com",
    origin: "*",
    credentials: true 
}));

app.use(morgan("combined"));

app.use(express.json());

app.use(express.static(path.join(__dirname, '..' , 'public')));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.use('/v1', api);

app.get("/", (req, res)=>{
    res.json('server start');
})

app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../', 'public', 'index.html'));
}); 


module.exports = app;