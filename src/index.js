require('./models/User');
require('./models/Creature');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const creatureRoutes = require('./routes/creatureRoutes');
const requireAuth = require('./middleware/requireAuth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(creatureRoutes);

mongoUri = 'mongodb+srv://admin:origin123@cluster0.a4jbb.mongodb.net/stat-blockdb?retryWrites=true&w=majority'; // Connection string from MongoDB Atlas Example:(mongodb+srv://admin:<password>@cluster0.3tx5j.mongodb.net/<dbname>?retryWrites=true&w=majority)
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance.');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo.', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3005, () => {
    console.log('Listening on port 3005');
});
