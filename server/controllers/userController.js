const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
