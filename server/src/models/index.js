import User from './User';
import Chat from './Chat';
import Message from './Message';

// Joining tables
const ChatsUsers = 'chats_users';
const UsersMessages = 'users_messages';

// Associations
User.belongsToMany(Chat, { through: ChatsUsers });

Chat.hasMany(Message);
Chat.belongsTo(User, { as: 'owner' });
Chat.belongsToMany(User, { through: ChatsUsers, as: 'participants' });

Message.belongsTo(User, { as: 'owner' });
Message.belongsToMany(User, { through: UsersMessages, as: 'views' });

// console.log('User associations:', Object.keys(User.associations));
// console.log('Chat associations:', Object.keys(Chat.associations));
// console.log('Message associations:', Object.keys(Message.associations));

export default {
  User,
  Chat,
  Message,
};
