import { DataTypes, Model } from 'sequelize';

import sequelize from '../../globals/store';

const { STRING } = DataTypes;

const modelName = 'friendRequest';

class FriendRequest extends Model {}
FriendRequest.init({
  text: {
    type: STRING,
  },
}, {
  sequelize,
  modelName,
});

export default FriendRequest;
