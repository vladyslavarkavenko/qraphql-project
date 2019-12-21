import User from './User';
import Chat from './Chat';
import Message from './Message';
import FriendRequest from './FriendRequest';

// Joining tables
const viewsTable = '_views';
const friendsTable = '_friends';
const participantsTable = '_participants';

// Associations
User.hasMany(FriendRequest);
User.belongsToMany(Chat, { through: participantsTable });
User.belongsToMany(User, { through: friendsTable, as: 'friends' });

Chat.hasMany(Message);
Chat.belongsTo(User, { as: 'owner' });
Chat.belongsToMany(User, { through: participantsTable, as: 'participants' });

Message.belongsTo(User, { as: 'owner' });
Message.belongsToMany(User, { through: viewsTable, as: 'views' });

FriendRequest.belongsTo(User, { as: 'sender' });
FriendRequest.belongsTo(User, { as: 'receiver' });

// console.log('User associations:', Object.keys(User.associations));
// console.log('Chat associations:', Object.keys(Chat.associations));
// console.log('Message associations:', Object.keys(Message.associations));
// console.log('FriendRequest associations:', Object.keys(FriendRequest.associations));

export default {
  User,
  Chat,
  Message,
  FriendRequest,
};
