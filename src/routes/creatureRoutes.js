const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

const Generic = mongoose.model('Creature');

const router = express.Router();

router.use(requireAuth);

router.get('/creatures', async (req, res) => {
    const creatures = await Creature.find({ userId: req.user._id });

    res.send(creatures);
});

router.post('/creatures', async (req, res) => {
    const { 
        name,
        size,
        type,
        tag,
        alignment,
        armorClass,
        hitPoints,
        speed,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        savingThrows,
        skills,
        vulnerabilities,
        resistances,
        immunities,
        senses,
        languages,
        challenge,
        experiencePoints,
        traits,
        actions,
        reactions,
        notes
    } = req.body;

    // if (!xx || !yy) {
    //     return res.status(422).send({ error: 'You must provide xx and yy' });
    // }

    try {
        const creature = new Generic({
            name,
            size,
            type,
            tag,
            alignment,
            armorClass,
            hitPoints,
            speed,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
            savingThrows,
            skills,
            vulnerabilities,
            resistances,
            immunities,
            senses,
            languages,
            challenge,
            experiencePoints,
            traits,
            actions,
            reactions,
            notes,
            userId: req.user._id,
            // userId: 999999,
            created: new Date().toISOString()
        });
        await creature.save();
        res.send(creature);
    } catch (err) {
        res.status.send({ error: err.message });
    }
});

module.exports = router;