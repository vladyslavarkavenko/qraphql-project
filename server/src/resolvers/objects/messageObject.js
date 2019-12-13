const views = async (message) => (await message.getViews()).length;

export default {
  views,
};
