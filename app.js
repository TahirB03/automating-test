const express = require ('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
app.use('/Itemuploads',express.static('Itemuploads'));
app.use('/Categoryuploads',express.static('Categoryuploads'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.post('/items',()=>{
  res.sendStatus(200)
})

const connectDB = require('./config/db');

dotenv.config({ path:'./config/config.env' });

connectDB();

//Routes
app.use('/',require('./routs/itemRoute'));
app.use('/',require('./routs/categoryRoute.js'));

app.listen(3000);

export default app