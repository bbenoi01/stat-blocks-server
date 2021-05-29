const express = require('express');
const mongoose = require('mongoose');
const ObjectID = require('mongoose').Types.ObjectId;
const requireAuth = require('../middleware/requireAuth');

const Campaign = mongoose.model('Campaign');

const router = express.Router();

router.use(requireAuth);

router.get('/mycampaigns', async (req, res) => {
    const campaigns = await Campaign.find({ userId: req.user._id });

    res.send(campaigns);
});

router.post('/campaign', async (req, res) => {
    const {
        name,
        monsters
    } = req.body;

    try {
        const campaign = new Campaign({
            name,
            monsters,
            userId: req.user._id,
            created: new Date().toISOString()
        });
        await campaign.save();
        const myCampaigns = await Campaign.find({ userId: req.user._id });
        res.send(myCampaigns);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.put('/campaign/:id', async (req, res) => {
    const { monster } = req.body;

    if(!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('No campaign with the id:' + req.params.id)
    }

    try {
        let campaign = await Campaign.findById(req.params.id);
        campaign.monsters.push(monster);
        await Campaign.updateOne({ _id: req.params.id }, { monsters: campaign.monsters });
        const myCampaigns = await Campaign.find({ userId: req.user._id });
        res.send(myCampaigns);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
})

router.delete('/campaign/:id', async (req, res) => {
    if(!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('No campaign with the id:' + req.params.id)
    }
    
    try { 
        await Campaign.findByIdAndRemove(req.params.id);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
})

module.exports = router;