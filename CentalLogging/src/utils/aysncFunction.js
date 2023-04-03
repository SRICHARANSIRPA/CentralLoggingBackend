module.exports = async (executeFunction) => {
  try {
    return await executeFunction();
  } catch (err) {
    console.log(`Exception..$$$#######${err}`);
    throw new Error(err);
  }
};
