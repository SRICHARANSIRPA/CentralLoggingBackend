const { sequelize } = require("../db/models");
module.exports = async (executerFunction) => {
  const t = await sequelize.transaction();
  try {
    const result = await executerFunction();
    await t.commit();
    return result;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};
