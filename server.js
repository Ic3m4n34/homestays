const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect Database
connectDB();

//Initialize Middleware 
app.use(express.json({ extended: false}));

app.get('/',(req,res) => res.send('API Running'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profle'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/search', require('./routes/api/search'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/homestay', require('./routes/api/homestay'));

//Define Upload folder for image 
app.use('/uploads',express.static('uploads'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
