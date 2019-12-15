import main from './main.graphql';
import UsersResponse from './users.graphql';
import ChatsResponse from './chats.graphql';
import MessagesResponse from './messages.graphql';

const subscriptions = [main, UsersResponse, ChatsResponse, MessagesResponse].join('\n');

export default subscriptions;
