const Internaute = require('../models/Internaute');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require("../errors/AppError");


exports.login = async (req, res, next) => {
    //  #swagger.tags = ["Auth"]
    try {
        const { email, motDePasse } = req.body;
        const internaute = await Internaute.findOne({ email }).select('+motDePasse');

    if (
      !internaute ||
      !(await bcrypt.compare(motDePasse, internaute.motDePasse))
    ) {
      throw new AppError(
        401,
        "INVALID_CREDENTIAL",
        "Identifiants ou Mot de passe incorrects"
      );
    }

    const token = jwt.sign(
      { id: internaute._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};