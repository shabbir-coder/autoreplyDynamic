const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: false },
  number: { type: String, required: true },
  param1 : {type: String, required: false, default: '' },
  param2 : {type: String, required: false, default: '' },
  param3 : {type: String, required: false, default: '' },
  isVerified : {type: Boolean, default: false},
  lastResponse: {type: String, default:''},
  lastResponseUpdatedAt: {type: Date},
  isAdmin: {type: Boolean, default: false},
  createdBy: {type: mongoose.Types.ObjectId},
  instanceId: {type: String},
  campaignId: {type: String},
},{timestamps: true});

const chatLogs = new mongoose.Schema({
  senderNumber: { type: String },
  senderCode: { type: String},
  isValid: {type: Boolean, default: false},
  finalResponse: {type: String},
  otherMessages : {type: {}},
  instanceId: {type: String},
  campaignId: {type: String},
  messageTrack: {type: Number , default: null},
  sequenceTrack: {type: Number , default: 0},
}, { timestamps: true }
);


const chatSchema = new mongoose.Schema({
  campaignId: {type: mongoose.Schema.Types.ObjectId},
  senderNumber: { type: String },
  fromMe: {type: Boolean},
  recieverId: { type: mongoose.Schema.Types.ObjectId},
  instanceId: {type: String},
  text: { type: String},
  type: {type: String},
  mediaUrl: {type: String},
  // Add other message-related fields as needed
}, { timestamps: true }
);

const ChatLogs = mongoose.model('chatLogs', chatLogs);
const Contact = mongoose.model('contact', contactSchema);
const Message = mongoose.model('message', chatSchema);

module.exports = { Contact, Message, ChatLogs };
