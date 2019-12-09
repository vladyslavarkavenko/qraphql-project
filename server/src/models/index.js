import User from './UserModel';
import Chat from './ChatModel';
import Message from './MessageModel';

// Joining tables
const ChatUser = 'ChatUser';

Chat.belongsTo(User, { as: 'owner' });
Chat.hasMany(Message, { as: 'messages' });

User.belongsToMany(Chat, { through: ChatUser, as: 'chats' });
Chat.belongsToMany(User, { through: ChatUser, as: 'participants' });

export default {
  User,
  Chat,
  Message,
};
