const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    monsters: {
        type: Array,
        required: true
    }
});

mongoose.model('Campaign', campaignSchema);