const express= require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect("mongodb+srv://schahat801:fCh1dBpBCNllWEsi@cluster0.ghwehab.mongodb.net/aakarsh?retryWrites=true&w=majority").then(()=> console.log('Database connected'));
const UserRoutes = require('./routes/user_route');
app.use("/api/user", UserRoutes);

const PORT= 5000;


app.listen(PORT, ()=> console.log('Server started at Port : 5000'));

