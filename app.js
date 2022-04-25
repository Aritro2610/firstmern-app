if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const postRoutes = require('./routes/posts');
const cors = require('cors');

app.use(express.static(path.join(__dirname,'../client/public')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ,{
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error',error=> console.error(error));
db.once('open',()=> console.log('connected to MongoDB'));

app.get('/',(req,res)=>{
  res.send('Connected to server !')
  res.send('WELCOME TO THE TRAIL APP')
})
app.use('/posts',postRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
  });