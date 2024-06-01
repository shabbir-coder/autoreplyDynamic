const express = require('express');
const campaignController = require('../controllers/campaignController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('', authenticateToken, campaignController.saveOrUpdateCampaign);
router.get('', authenticateToken, campaignController.listAllCampaigns);
router.get('/:id', authenticateToken, campaignController.getCampaignById);
router.delete('/:id', authenticateToken, campaignController.deleteCampaign);

module.exports = router;
