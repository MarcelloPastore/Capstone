const express = require('express');
const mongoose = require('mongoose');
const PORT = 6969;
const app = express();

require('dotenv').config();

// require routes
const revPostRoute = require('./routes/revPosts');
// middleware
app.use(express.json());

// import routes
app.use('/', revPostRoute);


mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al server!'));
db.once('open', () => {
    console.log('Database MongoDB connesso con successo');
})

// ! Last row !
app.listen(PORT, () => console.log(`Ascoltando e avviato sulla porta: ${PORT}`));