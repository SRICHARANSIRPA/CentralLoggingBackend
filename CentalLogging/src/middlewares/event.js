const { Events } = require("../db/models/");
module.exports = async (req, res, next) => {
  try {
    const eventData = {
      Event_at: new Date(),
      Event_data: req.body,
    };
    const event = await Events.create(eventData);
    req.body.eventId = event.id;
    next();
  } catch (err) {
    next(err);
  }
};
