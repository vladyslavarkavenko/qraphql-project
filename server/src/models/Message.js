import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';
import { ATTACHMENT_TYPE } from '../const';

const { BOOLEAN, STRING, ENUM } = DataTypes;
const {
  IMAGE, AUDIO, VIDEO, DOCUMENT,
} = ATTACHMENT_TYPE;

const modelName = 'message';

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
  isEdited: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName,
});

export default Message;
