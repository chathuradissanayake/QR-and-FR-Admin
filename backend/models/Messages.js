const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactUsSchema = new Schema({ 
  message: {
    type: String,
    required: true,
  },
  reply: { 
    type: String, 
    default: null 
  },
  status: { 
    type: String, 
    enum: ['unread', 'read'], 
    default: 'unread' 
  },
  userstatus: { 
    type: String, 
    enum: ['unread', 'read', 'null'], 
    default: 'null' 
  },
  user: {
    objId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    userId: { type: String },
  },
}, { timestamps: { createdAt: true, updatedAt: true } });

const contactUsModel = mongoose.model('ContactUs', contactUsSchema);
module.exports = contactUsModel;
