import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';

const { STRING, ENUM } = DataTypes;

class Message extends Model {}
Message.init({
  text: {
    type: STRING,
  },
  attachment: {
    type: STRING,
  },
  attachmentType: {
    type: ENUM,
    values: ['IMAGE', 'AUDIO', 'VIDEO', 'DOCUMENT'],
  },
}, { sequelize, modelName: 'Message' });

export default Message;
