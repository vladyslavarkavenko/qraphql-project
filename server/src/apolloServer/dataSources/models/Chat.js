import { DataTypes, Model } from 'sequelize';

import sequelize from '../../globals/store';

const { STRING, BOOLEAN } = DataTypes;

const modelName = 'chat';

class Chat extends Model {}
Chat.init({
  name: {
    type: STRING,
  },
  img: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
  anonymous: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName,
});

export default Chat;
