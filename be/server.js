const express = require('express');
const mongoose = require('mongoose');
const PORT = 6969;
const app = express();
const cors = require('cors');
const path = require('path');


require('dotenv').config();

// require dei middleware
const logger = require('./middlewares/logger');

// require routes
const revPostRoute = require('./routes/revPosts');
const usersRoute = require('./routes/users');
// middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('./uploads', express.static(path.join(__dirname, './uploads')));

// import routes
app.use('/', revPostRoute);
app.use('/', usersRoute);

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al server!'));
db.once('open', () => {
    console.log('Database MongoDB connesso con successo');
})

// ! Last row !
app.listen(PORT, () => console.log(`Ascoltando e avviato sulla porta: ${PORT}`));