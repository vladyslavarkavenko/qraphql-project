import { Op } from 'sequelize';

const { gt, lt } = Op;

function encodeCursor(cursor) {
  // return cursor;
  return cursor ? Buffer.from(JSON.stringify(cursor)).toString('base64') : null;
}

function decodeCursor(cursor) {
  // return cursor;
  return cursor ? JSON.parse(Buffer.from(cursor, 'base64').toString('utf8')) : null;
}

const paginate = async (model, {
  last,
  after,
  first,
  before,
  where = {},
  method = 'findAll',
  paginationField = 'createdAt',
}) => {
  let cursorOptions = {};
  if (after) {
    cursorOptions = {
      [paginationField]: {
        [gt]: decodeCursor(after),
      },
    };
  }
  if (before) {
    cursorOptions = {
      [paginationField]: {
        [lt]: decodeCursor(before),
      },
    };
  }

  const order = first ? 'ASC' : 'DESC';
  // eslint-disable-next-line no-nested-ternary
  const limit = first > 0 ? first : last > 0 ? last : 0;

  const nodes = await model[method]({
    where: { ...where, ...cursorOptions },
    limit: limit + 1, // To detect if there are more nodes.
    order: [
      [paginationField, order],
    ],
  });

  const hasMore = nodes.length > limit;
  if (hasMore) {
    nodes.pop();
  }

  if (before) {
    nodes.reverse();
  }

  const pageInfo = {
    hasNext: first ? hasMore : !!before,
    hasPrev: first ? !!after : hasMore,
  };
  const edges = nodes.map((node) => ({
    node,
    cursor: encodeCursor(node[paginationField]),
  }));

  return { edges, pageInfo };
};

export default paginate;
