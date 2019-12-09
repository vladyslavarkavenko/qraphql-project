import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';
import { ATTACHMENT_TYPE } from '../const';

const { STRING, ENUM } = DataTypes;
const {
  IMAGE,
  AUDIO,
  VIDEO,
  DOCUMENT,
} = ATTACHMENT_TYPE;

const modelName = 'Message';

class Message extends Model {}
Message.init({
  text: {
    type: STRING,
    allowNull: false,
  },
  attachment: {
    type: STRING,
  },
  attachmentType: {
    type: ENUM,
    values: [IMAGE, AUDIO, VIDEO, DOCUMENT],
  },
}, {
  sequelize,
  modelName,
});

export default Message;
