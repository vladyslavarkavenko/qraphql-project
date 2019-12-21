import server from './apolloServer';

import { PORT } from './config';

server
  .listen({ port: PORT })
  .then(({ url }) => console.log(`🚀Server running: ${url}`));
