import { DataTypes, Model } from 'sequelize';

import sequelize from '../store';

const { STRING, BOOLEAN } = DataTypes;

const modelName = 'Chat';

class Chat extends Model {}
Chat.init({
  name: {
    type: STRING,
  },
  img: {
    type: STRING,
  },
  anonymous: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName,
});

export default Chat;
