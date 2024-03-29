const express = require('express');
const mongoose = require('mongoose');
const PORT = 6969;
const app = express();
const cors = require('cors');


require('dotenv').config();

// require dei middleware
const logger = require('./middlewares/logger');

// require routes
const revPostRoute = require('./routes/revPosts');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const sendEmailRoute = require('./routes/sendEmail');
const githubRoute = require('./routes/githubRoute');
// middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// import routes
app.use('/', revPostRoute);
app.use('/', usersRoute);
app.use('/', loginRoute);
app.use('/', sendEmailRoute);
app.use('/', githubRoute);

mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al server!'));
db.once('open', () => {
    console.log('Database MongoDB connesso con successo');
})

// ! Last row !
app.listen(PORT, () => console.log(`Ascoltando e avviato sulla porta: ${PORT}`));