// eslint-disable-next-line no-underscore-dangle
function __resolveType(obj) {
  if (obj.password) {
    return 'User';
  }
  if (obj.anonymous) {
    return 'Chat';
  }
  if (obj.attachment) {
    return 'Message';
  }

  return null;
}

export default { __resolveType };
