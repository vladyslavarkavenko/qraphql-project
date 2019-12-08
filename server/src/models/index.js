import User from './user';
import Chat from './chat';
import Message from './message';

Chat.belongsTo(User, { as: 'owner' });
Chat.hasMany(Message, { as: 'messages' });

User.belongsToMany(Chat, { through: 'ChatUser', as: 'chats' });
Chat.belongsToMany(User, { through: 'ChatUser', as: 'participants' });

export default {
  User,
  Chat,
  Message,
};
