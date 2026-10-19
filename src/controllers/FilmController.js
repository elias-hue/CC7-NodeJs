const mongoose = require("mongoose");
const Film = require('../models/Film');
require('../models/Pays');
require('../models/Artiste');
const NoteFilm = require('../models/NoteFilm');


const AppError = require("../errors/AppError");


exports.getFilms = async (req, res, next) => {
  // #swagger.tags = ["Films"]
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const filter = {};

    if (req.query.titre)
      filter.titre = { $regex: req.query.titre, $options: 'i' };

    if (req.query.genre)
      filter.genre = req.query.genre;

    if (req.query.annee)
      filter.annee = Number(req.query.annee);

    const [films, total] = await Promise.all([
      Film.find(filter).skip((page - 1) * limit).limit(limit),
      Film.countDocuments(filter)
    ]);

    res.json({ page, limit, total, films });
  } catch (err) {
    next(err);
  }
};

exports.getFilmDetails = async (req, res, next) => {
  // #swagger.tags = ["Films"]

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        400,
        "INVALID_ID",
        "Identifiant du film invalide"
      );
    }

    const film = await Film.findById(id)
      .populate("pays")
      .populate("realisateur", "nom prenom")
      .populate("casting.artiste", "nom prenom")
      .lean();

    if (!film) {
      throw new AppError(
        404,
        "FILM_NOT_FOUND",
        "Film introuvable"
      );
    }

    return res.status(200).json({ film });
  
  } catch (err) {
    next(err);
  }
};

exports.getNotesByFilm = async (req, res, next) => {
  // #swagger.tags = ["Films"]

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        400,
        "INVALID_ID",
        "Identifiant du film invalide"
      );
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const film = await Film.findById(id).select("_id");

    if (!film) {
      throw new AppError(
        404,
        "FILM_NOT_FOUND",
        "Film introuvable"
      );
    }

    const filter = { film: film._id };

    const [notes, total] = await Promise.all([
      NoteFilm.find(filter)
        .select("utilisateur film note")
        .populate("utilisateur", "nom prenom")
        .sort({ _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      NoteFilm.countDocuments(filter)
    ]);

    return res.status(200).json({
      film: id,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPreviousPage: page > 1,
      notes
    });
  } catch (err) {
    next(err);
  }
};