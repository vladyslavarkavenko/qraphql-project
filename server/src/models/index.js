import User from './User';
import Chat from './Chat';
import Message from './Message';

// Joining tables
const viewsTable = '_views';
const friendsTable = '_friends';
const participantsTable = '_participants';

// Associations
User.belongsToMany(Chat, { through: participantsTable });
User.belongsToMany(User, { through: friendsTable, as: 'friends' });

Chat.hasMany(Message);
Chat.belongsTo(User, { as: 'owner' });
Chat.belongsToMany(User, { through: participantsTable, as: 'participants' });

Message.belongsTo(User, { as: 'owner' });
Message.belongsToMany(User, { through: viewsTable, as: 'views' });

// console.log('User associations:', Object.keys(User.associations));
// console.log('Chat associations:', Object.keys(Chat.associations));
// console.log('Message associations:', Object.keys(Message.associations));

export default {
  User,
  Chat,
  Message,
};
