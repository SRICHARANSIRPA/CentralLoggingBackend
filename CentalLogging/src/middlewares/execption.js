module.exports = (req, res, next) => {
  try {
    next();
  } catch (err) {
    console.log(`Exeption occured at ${err}`);
    res.status(500).send("Something went wrong");
  }
};
