require('./models/User');
require('./models/Creature');
require('./models/Campaign');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const creatureRoutes = require('./routes/creatureRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
	console.log('Connected to mongo instance.');
});
mongoose.connection.on('error', (err) => {
	console.error('Error connecting to mongo.', err);
});

app.use(authRoutes);
app.use(creatureRoutes);
app.use(campaignRoutes);

app.listen(process.env.PORT || 3005, () => {
	console.log('Listening on port 3005');
});
