const Campaign = require('../models/campaignModel');
const Instance = require('../models/instanceModel')
const {Message, Contact, ChatLogs} = require('../models/chatModel');
const fs = require('fs')


function generateUniqueCode(length = 5) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

exports.saveOrUpdateCampaign = async (req, res) => {
    try {
      const { _id, ...data } = req.body;
  
      let campaign;
  
      if (_id) {
        data.updatedAt = new Date();  // Update updatedAt field
        campaign = await Campaign.findByIdAndUpdate(_id, data, { new: true });
      } else {
        data.campaignUID = generateUniqueCode();
        data.createdBy = req.user.userId;  // Add createdBy field

        campaign = new Campaign(data);
        await campaign.save();
      }
  
      res.status(200).json(campaign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // View Campaign by ID
  exports.getCampaignById = async (req, res) => {
    try {
      const { id } = req.params;
      const campaign = await Campaign.findById(id);
  
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
  
      res.status(200).json(campaign);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // List All Campaigns
  exports.listAllCampaigns = async (req, res) => {
    try {
      const userId = req.user.userId;  // Get userId from request
      const campaigns = await Campaign.find({ createdBy: userId })
      .select('campaignName campaignUID _id updatedAt startDate endDate ');;  // Fetch campaigns by createdBy field
    
      res.status(200).json({data: campaigns});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Delete Campaign
  exports.deleteCampaignData = async (req, res) => {
    try {
      const { campaignId } = req.params;
       // Delete instances related to the campaign
    await Instance.deleteMany({ campaignId });

    // Delete contacts related to the campaign
    await Contact.deleteMany({ campaignId });

    // Delete chatsLogs related to the campaign
    await ChatLogs.deleteMany({ campaignId });

    // Delete messages related to the campaign
    await Message.deleteMany({ campaignId });

    const result = await Campaign.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
  
      res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteChatsData = async (req, res) => {
    try {
      const campaignId = req.params.campaignId;
  
      // Delete chats related to the campaign
      await ChatLogs.deleteMany({ campaignId });

      // Delete messages related to the campaign
      await Message.deleteMany({ campaignId });
  
  
      res.status(200).json({ message: 'Chats for the campaign deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting chats', error });
    }
  }

  exports.deleteContactsData = async (req, res) => {
    try {
      const campaignId = req.params.campaignId;
  
      // Find the contact to get the campaignId
      const result = await Contact.deleteMany({ campaignId });
      
      if (!result) {
        return res.status(404).json({ message: 'Contacts not found' });
      }

      // Delete chatsLogs related to the campaign
      await ChatLogs.deleteMany({ campaignId });
  
      // Delete messages related to the campaign
      await Message.deleteMany({ campaignId });
  
  
      res.status(200).json({ message: 'Contact and related chats deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting contact', error });
    }
  }