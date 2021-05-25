const express = require('express');
const mongoose = require('mongoose');
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
        res.send(campaign);
    } catch (err) {
        res.status.send({ error: err.message });
    }
});

module.exports = router;