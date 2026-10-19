const mongoose = require("mongoose");
const Artiste = require("../models/Artiste");
const Film = require("../models/Film");
const AppError = require("../errors/AppError");

exports.getArtistes = async (req, res, next) => {
  // #swagger.tags = ["Artistes"]
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const filter = {};

    if (req.query.nom)
      filter.nom = req.query.nom;

    if (req.query.prenom)
      filter.prenom = req.query.prenom;

    const [artistes, total] = await Promise.all([
      Artiste.find(filter).skip((page - 1) * limit).limit(limit),
      Artiste.countDocuments(filter)
    ]);

    res.json({ page, limit, total, artistes });
  } catch (err) {
    next(err);
  }
};

exports.getFilmsRealises = async (req, res, next) => {
  // #swagger.tags = ["Artistes"]

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        400,
        "ARTIST_INVALID_ID",
        "Identifiant invalide"
      );
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

    const artiste = await Artiste.findById(id);

    if (!artiste) {
      throw new AppError(
        404,
        "ARTIST_NOT_FOUND",
        "Artiste introuvable"
      );
    }

    const filter = { realisateur: artiste._id };

    const [films, total] = await Promise.all([
      Film.find(filter)
        .sort({ annee: -1, titre: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Film.countDocuments(filter)
    ]);

    res.json({
      artiste: {
        id: artiste._id,
        nom: artiste.nom,
        prenom: artiste.prenom
      },
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      films
    });
  } catch (err) {
    next(err);
  }
};

exports.getArtisteDetails = async (req, res, next) => {
  // #swagger.tags = ["Artistes"]

  try {
    const { id } = req.params;

    // Vérifier le format de l'identifiant
    if (!mongoose.isValidObjectId(id)) {
      throw new AppError(
        400, 
        "ARTIST_INVALID_ID", 
        "Identifiant invalide");
    }

    const artiste = await Artiste.findById(id);

    if (!artiste) {
      throw new AppError(
        404,
        "ARTIST_NOT_FOUND",
        "Artiste introuvable"
      );
    }

    // Rechercher les films réalisés et les films joués
    const [filmsRealises, filmsJoues] = await Promise.all([
      Film.find({ realisateur: artiste._id })
        .populate("pays")
        .sort({ annee: -1, titre: 1 })
        .lean(),

      Film.find({ "casting.artiste": artiste._id })
        .populate("pays")
        .sort({ annee: -1, titre: 1 })
        .lean()
    ]);

    return res.status(200).json({
      artiste,
      filmsRealises,
      filmsJoues
    });
  } catch (err) {
    next(err);
  }
};