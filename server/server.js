const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
}));

app.use('/buyer', require('./routes/buyerRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/categoryRouter'))

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB');
})

app.get('/', (req, res) => {
    res.send({msg: "Welcome Ahmed"});
});

const Port = process.env.PORT || 4000

app.listen(Port, () => {
    console.log('Server listening on port', Port);
});