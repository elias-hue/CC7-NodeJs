const User = require("../models/Internaute");

exports.getUsers = async (req, res, next) => {
  // #swagger.tags = ["User"]
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const filter = {};

    if (req.query.nom)
      filter.nom = req.query.nom;

    if (req.query.prenom)
      filter.prenom = req.query.prenom;

    const [users, total] = await Promise.all([
      User.find(filter).skip((page - 1) * limit).limit(limit),
      User.countDocuments(filter)
    ]);

    res.json({ page, limit, total, users });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
    //  #swagger.tags = ["User"]
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
    next(err);
    }
};
