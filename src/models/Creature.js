const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
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
    size: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: false
    },
    alignment: {
        type: String,
        required: true
    },
    armorClass: {
        type: String,
        required: true
    },
    hitPoints: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    strength: {
        type: String,
        required: true
    },
    dexterity: {
        type: String,
        required: true
    },
    constitution: {
        type: String,
        required: true
    },
    intelligence: {
        type: String,
        required: true
    },
    wisdom: {
        type: String,
        required: true
    },
    charisma: {
        type: String,
        required: true
    },
    savingThrows: {
        type: String,
        required: false
    },
    skills: {
        type: Array,
        required: true
    },
    vulnerabilities: {
        type: Array,
        required: false
    },
    resistances: {
        type: Array,
        required: false
    },
    immunities: {
        type: Array,
        required: false
    },
    senses: {
        type: Array,
        required: true
    },
    languages: {
        type: Array,
        required: true
    },
    challenge: {
        type: String,
        required: true
    },
    experiencePoints: {
        type: Number,
        required: true
    },
    traits: {
        type: Array,
        required: false
    },
    actions: {
        type: Array,
        required: true
    },
    reactions: {
        type: Array,
        required: false
    },
    notes: {
        type: String,
        required: false
    }
});

mongoose.model('Creature', creatureSchema);