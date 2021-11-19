const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()
require('./Models/db_connection');
const postsChantier_router = require('./Routes/postsChantier_router');
const user_router = require('./Routes/user.route');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
console.log('le CLIENT: ' + process.env.CLIENT_URL)
app.use(cors(corsOptions));


//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.json())
app.use(express.static('assets'));

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//Routes
app.use('/chantiers', postsChantier_router);
app.use('/users', user_router);

//Port d'écoute
app.listen(process.env.PORT, () => {
    console.log('listening Port on: ' + process.env.PORT)
})