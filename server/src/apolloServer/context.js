import { formatAuthCtx } from './helpers';

const context = ({ req, connection }) => (
  connection
    ? connection.context
    : formatAuthCtx({ req })
);

export default context;
