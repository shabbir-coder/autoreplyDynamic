const express = require('express');
const campaignController = require('../controllers/campaignController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('', authenticateToken, campaignController.saveOrUpdateCampaign);
router.get('', authenticateToken, campaignController.listAllCampaigns);
router.get('/:id', authenticateToken, campaignController.getCampaignById);

router.delete('/:campaignId', authenticateToken, campaignController.deleteCampaignData); // delete campaign

router.delete('/chats/:campaignId', authenticateToken, campaignController.deleteChatsData); // delete campaign

router.delete('/contacts/:campaignId', authenticateToken, campaignController.deleteContactsData); // delete campaign


module.exports = router;
